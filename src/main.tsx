import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { applyTheme, getStoredTheme } from './lib/theme';
import './index.css';

applyTheme(getStoredTheme());

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
