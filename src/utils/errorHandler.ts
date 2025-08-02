/**
 * Centralized Error Handling Utility
 * أداة مركزية للتعامل مع الأخطاء
 * 
 * Provides consistent error logging and handling across the application
 * يوفر تسجيل وإدارة أخطاء متسقة عبر التطبيق
 */

import { env } from './env';

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface SerializedError {
  message: string;
  name?: string;
  stack?: string;
  code?: string | number;
  timestamp: string;
  context?: ErrorContext;
}

/**
 * Serialize error object for safe logging
 * تسلسل كائن الخطأ للتسجيل الآمن
 */
export const serializeError = (error: unknown, context?: ErrorContext): SerializedError => {
  const timestamp = new Date().toISOString();

  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: env.DEBUG_MODE ? error.stack : undefined,
      timestamp,
      context
    };
  }

  // Handle Supabase errors
  if (error && typeof error === 'object' && 'message' in error) {
    const supabaseError = error as any;
    return {
      message: supabaseError.message || 'Database error',
      name: 'SupabaseError',
      code: supabaseError.code,
      stack: env.DEBUG_MODE ? supabaseError.details || supabaseError.hint : undefined,
      timestamp,
      context
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error,
      name: 'StringError',
      timestamp,
      context
    };
  }

  // Handle unknown errors
  return {
    message: 'Unknown error occurred',
    name: 'UnknownError',
    timestamp,
    context: {
      ...context,
      errorType: typeof error,
      errorValue: String(error)
    }
  };
};

/**
 * Log error with proper serialization
 * تسجيل الخطأ مع التسلسل المناسب
 */
export const logError = (
  error: unknown,
  message: string = 'An error occurred',
  context?: ErrorContext
): void => {
  const serializedError = serializeError(error, context);

  // Use safe logging to prevent [object Object] errors
  console.error(`🚨 ${message}:`, JSON.stringify(serializedError, null, 2));
  
  // In production, you might want to send errors to an external service
  if (env.IS_PRODUCTION && env.ENABLE_ANALYTICS) {
    // Send to analytics service
    try {
      // You can integrate with services like Sentry, LogRocket, etc.
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          description: serializedError.message,
          fatal: false
        });
      }
    } catch (reportingError) {
      console.warn('Failed to report error to analytics:', reportingError);
    }
  }
};

/**
 * Log warning with context
 * تسجيل تحذير مع السياق
 */
export const logWarning = (
  message: string,
  context?: ErrorContext
): void => {
  console.warn(`⚠️ ${message}`, {
    timestamp: new Date().toISOString(),
    context
  });
};

/**
 * Log info message
 * تسجيل رسالة معلومات
 */
export const logInfo = (
  message: string,
  data?: any
): void => {
  if (env.DEBUG_MODE) {
    console.info(`ℹ️ ${message}`, data);
  }
};

/**
 * Error boundary helper for React components
 * مساعد حدود الخطأ لمكونات React
 */
export const handleComponentError = (
  error: Error,
  errorInfo: { componentStack: string },
  componentName: string
): void => {
  logError(error, `Error in ${componentName} component`, {
    component: componentName,
    metadata: {
      componentStack: errorInfo.componentStack
    }
  });
};

/**
 * Network error helper
 * مساعد أخطاء الشبكة
 */
export const handleNetworkError = (
  error: unknown,
  endpoint: string,
  method: string = 'GET'
): void => {
  logError(error, `Network error: ${method} ${endpoint}`, {
    action: 'network_request',
    metadata: {
      endpoint,
      method
    }
  });
};

/**
 * Database error helper
 * مساعد أخطاء قاعدة البيانات
 */
export const handleDatabaseError = (
  error: unknown,
  operation: string,
  table?: string
): void => {
  logError(error, `Database error during ${operation}`, {
    action: 'database_operation',
    metadata: {
      operation,
      table
    }
  });
};

/**
 * User action error helper
 * مساعد أخطاء إجراءات المستخدم
 */
export const handleUserActionError = (
  error: unknown,
  action: string,
  userId?: string
): void => {
  logError(error, `User action failed: ${action}`, {
    action,
    userId,
    metadata: {
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    }
  });
};

/**
 * Create error handler with context
 * إنشاء معالج خطأ مع السياق
 */
export const createErrorHandler = (defaultContext: ErrorContext) => {
  return (error: unknown, message?: string, additionalContext?: ErrorContext) => {
    logError(error, message, {
      ...defaultContext,
      ...additionalContext
    });
  };
};

// Export commonly used error handlers
export const errorHandlers = {
  network: handleNetworkError,
  database: handleDatabaseError,
  userAction: handleUserActionError,
  component: handleComponentError
};

export default {
  logError,
  logWarning,
  logInfo,
  serializeError,
  errorHandlers,
  createErrorHandler
};
