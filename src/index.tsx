import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { store } from './store/index';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>,
);