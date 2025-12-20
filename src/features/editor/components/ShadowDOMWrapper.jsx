import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import lexicalStyles from '../lexicalStyles';

/**
 * ShadowDOMWrapper Component
 * 
 * Wraps children in a Shadow DOM for complete style encapsulation.
 * This prevents global CSS from affecting the wrapped content and vice versa.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside Shadow DOM
 * @param {string} props.mode - Shadow DOM mode: 'open' or 'closed' (default: 'open')
 * @param {string} props.className - CSS classes to apply to the host element
 * @param {Object} props.style - Inline styles for the host element
 */
const ShadowDOMWrapper = ({ children, mode = 'open', className = '', style = {} }) => {
  const hostRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);

  useEffect(() => {
    if (!hostRef.current) return;

    // Create shadow root if it doesn't exist
    let shadow = hostRef.current.shadowRoot;
    if (!shadow) {
      shadow = hostRef.current.attachShadow({ mode });
      
      // Create style element and inject Lexical styles
      const styleElement = document.createElement('style');
      styleElement.textContent = lexicalStyles;
      shadow.appendChild(styleElement);

      // Create container div for React content
      const container = document.createElement('div');
      container.id = 'shadow-root-container';
      shadow.appendChild(container);

      setShadowRoot(shadow);
    }

    return () => {
      // Cleanup is handled by React's unmounting
    };
  }, [mode]);

  // Render children into shadow DOM using createPortal
  const renderContent = () => {
    if (!shadowRoot) return null;
    
    const container = shadowRoot.getElementById('shadow-root-container');
    if (!container) return null;

    return createPortal(children, container);
  };

  return (
    <div 
      ref={hostRef} 
      className={className}
      style={style}
    >
      {renderContent()}
    </div>
  );
};

export default ShadowDOMWrapper;
