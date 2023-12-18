import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { NotFound } from "./Pages/404/404";
import ProjectPage from "./projectsPages/projectPage/ProjectPage";
import ContactsPage from "./Pages/ContactsPage/ContactsPage";
import AdminPage from "./adminPage/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/projects",
        element: <ProjectPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/contacts",
        element: <ContactsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
