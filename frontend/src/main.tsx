import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RouterProvider } from './lib/router';
import './index.css';

// RouterProvider MUST wrap App — it owns the hash-change listener.
// Without it useRoute() always returns '/' and every navigation
// appears dead (this was the original "buttons do nothing" bug).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>,
);
