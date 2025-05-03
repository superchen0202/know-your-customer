import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/globals.css';
import App from './App.tsx';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (!container) throw new Error('Missing root element. Did you forget `<div id="root"></div>` in index.html?');

const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
