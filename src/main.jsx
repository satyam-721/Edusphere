import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Doubt from './Doubt.jsx'

import Dashboard from './Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    {/* <Dashboard/> */}
    <Doubt/>
  </StrictMode>,
)
