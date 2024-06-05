import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from './App.jsx'
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "", element: <Header /> },
      { path: "about", element: <h1>About</h1> },                                                                                                                                                                                                            
      { path: "home", element: <Home /> },
      { path: "play", element: <h1>play</h1> },
      { path: "home/favorites", element: <Favorites/> },
      { path: "contact", element: <h1>Contact</h1> },
      { path: "*", element: <h1>404</h1> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
