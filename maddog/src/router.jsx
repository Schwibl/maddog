import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Layout } from "./layouts/Layout";
import { NotFound } from "./Pages/404/404";
import ProjectPage from "./projectsPages/projectPage/ProjectPage";
import ContactsPage from "./Pages/ContactsPage/ContactsPage";
import AdminPage from "./adminPage/AdminPage";

export const router = createBrowserRouter([
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
      ]
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]
  // , { basename: '/MadDog/'}
  );