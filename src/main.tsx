import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { AchievementProvider } from './context/AchievementContext';

console.log("MAIN.TSX IS RUNNING");

// Catch errors during module loading
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, any> {
  constructor(props: any) {
    super(props);
    (this as any).state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) { 
    console.error('getDerivedStateFromError:', error);
    return { hasError: true, error }; 
  }
  componentDidCatch(error: any, info: any) { 
    console.error('ErrorBoundary caught:', error, info); 
  }
  render() {
    if ((this as any).state.hasError) {
      const errorMsg = (this as any).state.error?.toString() || 'Unknown error';
      const stack = (this as any).state.error?.stack || '';
      return (
        <div style={{ color: 'red', padding: '20px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '12px' }}>
          <h1>Something went wrong.</h1>
          <p><strong>Error:</strong></p>
          <pre>{errorMsg}</pre>
          {stack && (
            <>
              <p><strong>Stack:</strong></p>
              <pre>{stack}</pre>
            </>
          )}
        </div>
      );
    }
    return (this as any).props.children;
  }
}

const rootElement = document.getElementById('root');
console.log("ROOT ELEMENT FOUND:", !!rootElement);

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <AchievementProvider>
            <App />
          </AchievementProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
  console.log("REACT RENDER CALLED");
} else {
  console.error("ROOT ELEMENT IS NULL");
}
