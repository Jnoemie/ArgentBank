import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { initReduxStore } from './appLogic/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={initReduxStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)