import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Routes/Root'
import Login from './Routes/Login'
import Dashboard from './Routes/Dashboard'

//Add in error elements & loaders
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
