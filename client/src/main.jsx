// index.jsx (or main router file)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Doubt from './Teacher/Doubt.jsx';
import Dashboard from './Teacher/Dashboard.jsx';
import StudentMain from './Students/StudentMain.jsx';
import Upload from './Teacher/Upload/Upload.jsx';
import BackendTest from './backendtest.jsx';
import Login from './Auth/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: '/teacher',
    element: (
      <ProtectedRoute role="teacher">
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/teacher/upload',
    element: (
      <ProtectedRoute role="teacher">
        <Upload />
      </ProtectedRoute>
    )
  },
  {
    path: '/teacher/doubt',
    element: (
      <ProtectedRoute role="teacher">
        <Doubt />
      </ProtectedRoute>
    )
  },
  {
    path: '/student/*',
    element: (
      <ProtectedRoute role="student">
        <StudentMain />
      </ProtectedRoute>
    )
  },
  { path: '/test/backend', element: <BackendTest /> }, // public (or protect if needed)
  { path: '/', element: <Login /> } // login public
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
