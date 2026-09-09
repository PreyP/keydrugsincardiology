import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
// Weight-axis variable Newsreader, latin subset only downloads at runtime.
// ~123 kB (normal + italic) vs ~279 kB for the optical-size build.
import '@fontsource-variable/newsreader/wght.css'
import '@fontsource-variable/newsreader/wght-italic.css'
import './styles/global.css'
// v2 aesthetic layers: extra tokens, then overrides applied after global.css.
import './styles/diagram-tokens.css'
import './styles/diagrams.css'
import './styles/ui-v2.css'

// The saved theme is applied inside components/ThemeToggle.jsx at module load,
// before this render call, so there is no unstyled flash.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
