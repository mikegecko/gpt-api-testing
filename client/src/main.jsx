import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/Root'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import ErrorPage from './routes/ErrorPage'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme'

//Add in error elements & loaders
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
