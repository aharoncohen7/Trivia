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
import Play from "./pages/Play.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "", element: <Header /> },
      { path: "about", element: <About/> },                                                                                                                                                                                                            
      { path: "home", element: <Home /> },
      { path: "play", element: <Play/> },
      { path: "favorites", element: <Favorites/> },
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
