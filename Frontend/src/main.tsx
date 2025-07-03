// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// createRoot(document.getElementById("root")!).render(<App />);


import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { SettingsProvider } from './contexts/SettingsContext';


// ⚙️ Settings context
// import { SettingsProvider } from './contexts/SettingsContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
        <SettingsProvider>
          <App />
        </SettingsProvider>
    </React.StrictMode>
  );
}