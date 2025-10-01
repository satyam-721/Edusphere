import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Doubt from './Doubt.jsx'
import Dashboard from './Dashboard.jsx'
import StudentMain from './Students/StudentMain.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    {/* <Dashboard/> */}
    <StudentMain/>
    
  </StrictMode>,
)
