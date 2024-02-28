import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App";
import CreateArticle from "./pages/CreateArticle";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import AllArticles from "./pages/AllArticles";
import OneArticle from "./pages/OneArticle";
import Admin from "./pages/Admin";
import AdminArticleDetail from "./pages/AdminInspectArticle";
import ProtectedRoutes from "./components/ProtectedRoutes";
import VerificationPage from "./pages/VerificationPage";

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
      { path: "/articles", element: <AllArticles /> },
      { path: "/articles/:articleId", element: <OneArticle /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoutes>
            <Admin />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/articles/:articleId",
        element: (
          <ProtectedRoutes>
            <AdminArticleDetail />
          </ProtectedRoutes>
        ),
      },
      { path: "/verify/:token", element: <VerificationPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
