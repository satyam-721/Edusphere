import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import Doubt from './Doubt.jsx'
// import Dashboard from './Dashboard.jsx'
// import StudentMain from './Students/StudentMain.jsx'
import Upload from './Upload/Upload'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    {/* <Dashboard/> */}
    {/* <Doubt/> */}
    {/* <StudentMain/> */}
    <Upload/>
    
  </StrictMode>,
)
