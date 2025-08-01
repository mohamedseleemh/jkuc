import React from 'react';
import { useCustomization } from '../context/CustomizationContext';
import { useTheme } from '../context/ThemeContext';
import ElementRenderer from './admin/VisualEditor/ElementRenderer';

const CustomElementsRenderer: React.FC = () => {
  const { customization } = useCustomization();
  const { theme } = useTheme();

  // Don't render if there are no custom elements
  if (!customization?.pageElements || customization.pageElements.length === 0) {
    return null;
  }

  // Sort elements by order for proper display
  const sortedElements = [...customization.pageElements]
    .filter(element => element.visible)
    .sort((a, b) => a.order - b.order);

  const customTheme = {
    id: 'custom',
    name: 'Custom Theme',
    colors: {
      primary: customization.globalSettings.primaryColor,
      secondary: customization.globalSettings.secondaryColor,
      accent: customization.globalSettings.accentColor,
      background: theme === 'dark' ? '#1F2937' : '#ffffff',
      text: theme === 'dark' ? '#ffffff' : '#000000'
    },
    fonts: {
      heading: customization.globalSettings.fontFamily,
      body: customization.globalSettings.fontFamily
    },
    spacing: {
      small: 8,
      medium: 16,
      large: 32
    }
  };

  return (
    <div className="custom-elements-container">
      {sortedElements.map((element, index) => (
        <section
          key={element.id}
          className={`custom-element-section ${element.type}-section`}
          style={{
            fontFamily: customization.globalSettings.fontFamily,
            '--element-order': element.order
          } as React.CSSProperties}
        >
          <div 
            className="custom-element-wrapper"
            style={{
              minHeight: element.size.height,
              padding: element.styles.padding ? `${element.styles.padding}px` : undefined,
              margin: element.styles.margin ? `${element.styles.margin}px` : undefined,
            }}
          >
            <ElementRenderer
              element={element}
              theme={customTheme}
              isEditing={false}
            />
          </div>
        </section>
      ))}
      
      {/* Custom CSS Injection */}
      {customization.pageLayout?.customCSS && (
        <style dangerouslySetInnerHTML={{
          __html: customization.pageLayout.customCSS
        }} />
      )}
    </div>
  );
};

export default CustomElementsRenderer;
