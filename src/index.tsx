import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from 'src/store/index'

import App from 'src/App'
import { ApiProvider } from 'src/api/api-context'

import 'src/styles/index.scss'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ReduxProvider>
  </React.StrictMode>
)
