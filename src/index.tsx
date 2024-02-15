import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { store } from './store/index';
import { Provider as ReduxProvider } from 'react-redux';
import { ApiProvider } from './api/api-context';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
