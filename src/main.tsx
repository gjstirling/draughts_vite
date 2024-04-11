import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// This is our entry point to the application (a script run by index.html)
// It acts as a container for the logic of my app
// Will need to understand index.css role in styling
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
