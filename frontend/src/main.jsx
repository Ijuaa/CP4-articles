import React, { Children } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App";
import CreateArticle from "./pages/CreateArticle";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";

import "./styles/root.scss";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreateArticle />,
      },
      { path: "*", element: <Page404 /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
