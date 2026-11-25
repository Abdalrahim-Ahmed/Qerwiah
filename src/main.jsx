import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const updateFaviconForTheme = () => {
  const favicon = document.querySelector('#dynamic-favicon');
  if (!favicon) return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const variant = prefersDark ? '/favicon-beige.svg' : '/favicon.svg';
  favicon.href = `${variant}?v=20261125`;
};

updateFaviconForTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', updateFaviconForTheme);

createRoot(document.getElementById('root')).render(<App />);
