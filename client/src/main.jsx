import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root, { rootLoader } from './routes/Root'
import Login from './routes/Login'
import Dashboard, { dashboardLoader } from './routes/Dashboard'
import ErrorPage from './routes/ErrorPage'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './utils/theme'
// Supports weights 100-900
import '@fontsource-variable/inter';
import Signup from './routes/Signup'

//Add in error elements & loaders
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: "/auth/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: dashboardLoader,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
