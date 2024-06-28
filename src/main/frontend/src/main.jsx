import './index.css'
import './assets/normalize.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider, createStore as createJotaiStore } from 'jotai'

const rootElement = document.getElementById('root')
if (rootElement) {
  console.log('Root element found')
  const root = ReactDOM.createRoot(rootElement)
  const jotaiStore = createJotaiStore()

  root.render(
    <React.StrictMode>
      <Provider store={jotaiStore}>
        <App />
      </Provider>
    </React.StrictMode>
  )
} else {
  console.error('No root element found')
}
