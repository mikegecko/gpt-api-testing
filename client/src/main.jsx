import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, { rootLoader } from "./routes/Root";
import Login from "./routes/Login";
import Dashboard, { dashboardLoader } from "./routes/Dashboard";
import ErrorPage from "./routes/ErrorPage";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./utils/theme";
// Supports weights 100-900
import "@fontsource-variable/inter";
import Signup from "./routes/Signup";
import NewAdventure, { newAdventureLoader } from "./routes/NewAdventure";
import Adventure, { adventureLoader } from "./routes/Adventure";

//Background image this is error 404 cant find the resource
const darkbg = "url(assets/layered-steps.svg)";
const lightbg = "url(assets/layered-steps-light.svg)";

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
  },
  {
    path: "/new",
    element: <NewAdventure />,
    errorElement: <ErrorPage />,
    loader: newAdventureLoader,
  },
  {
    path: "/adventure/:id",
    element: <Adventure />,
    errorElement: <ErrorPage />,
    loader: adventureLoader,
  },
]);

function App() {
  const [bgImage, setBgImage] = useState(darkbg);

  useEffect(() => {
    const colorMode = localStorage.getItem("chakra-ui-color-mode");
    setBgImage(colorMode === "light" ? lightbg : darkbg);
  }, []);

  return (
    <div id="root">
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <RouterProvider className="App" router={router} />
        </ChakraProvider>
      </React.StrictMode>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
