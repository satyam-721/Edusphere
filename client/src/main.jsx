import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Doubt from './Teacher/Doubt.jsx'
import Dashboard from './Teacher/Dashboard.jsx'
import StudentMain from './Students/StudentMain.jsx'
import Upload from './Teacher/Upload/Upload.jsx'
import BackendTest from './backendtest.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
  { path: '/teacher', element: <Dashboard /> },
  { path: '/teacher/upload', element: <Upload /> },
  { path: '/teacher/doubt', element: <Doubt /> },
  { path: '/student/*', element: <StudentMain /> },
  {path: '/test/backend', element: <BackendTest /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router}/>
  </StrictMode>,
)
