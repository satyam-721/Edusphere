import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Doubt from './Teachers/Doubt/Doubt.jsx'
import Dashboard from './Teachers/Dashboard.jsx'
import StudentMain from './Students/StudentMain.jsx'
import Upload from './Teachers/Upload/Upload.jsx'
import Test from './TEST.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    {/* <Dashboard/> */}
    {/* <Doubt/> */}
    {/* <StudentMain/> */}
    <Upload/>
    {/* <Test/> */}
    
  </StrictMode>,
)
