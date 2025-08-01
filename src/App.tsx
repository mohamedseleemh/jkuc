import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { env } from './utils/env';

function App() {
  useEffect(() => {
    // Test error logging in development mode
    if (env.DEBUG_MODE) {
      console.log('🔧 Error logging system initialized');

      // Test error logging if URL contains debug parameter
      if (window.location.search.includes('debug-errors')) {
        import('./utils/errorTest').then(({ testErrorLogging }) => {
          setTimeout(testErrorLogging, 1000);
        });
      }
    }
  }, []);

  return (
    <ThemeProvider>
      <CustomizationProvider>
        <DataProvider>
          <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  fontFamily: 'Cairo, system-ui, sans-serif'
                },
                className: 'dark:bg-gray-800 dark:text-white',
              }}
            />
          </div>
        </DataProvider>
      </CustomizationProvider>
    </ThemeProvider>
  );
}

export default App;
