import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import '@fontsource-variable/newsreader/opsz.css'
import '@fontsource-variable/newsreader/opsz-italic.css'
import './styles/global.css'
// v2 aesthetic layers: extra tokens, then overrides applied after global.css.
import './styles/diagram-tokens.css'
import './styles/diagrams.css'
import './styles/ui-v2.css'

// Apply the saved theme before first paint to avoid a flash.
const saved = localStorage.getItem('kdc-theme')
if (saved) document.documentElement.setAttribute('data-theme', saved)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
