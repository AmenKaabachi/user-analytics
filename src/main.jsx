import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // Use HashRouter
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
}