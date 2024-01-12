import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import AdminPage from './adminPage/AdminPage';
import App from './App';
import { Layout } from './layouts/Layout';
import { LayoutChild } from './layouts/LayoutChild';
import { NotFound } from './Pages/404/404';
import ContactsPage from './Pages/ContactsPage/ContactsPage';
import EstimatePage from './Pages/EstimatePage/EstimatePage';
import ProjectPage from './Pages/ProjectsPage/ProjectPage';

//создаем массив роутов, которые будут рендериться внутри компонента Layout, в зависимости от указанного пути
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/admin',
        element: <LayoutChild />,
        errorElement: <NotFound />,
        children: [
          {
            path: '/admin',
            element: <AdminPage />,
          },
          {
            path: '/admin/projects',
            element: <ProjectPage />,
          },
          {
            path: '/admin/contacts',
            element: <ContactsPage />,
          },
          {
            path: '/admin/estimate/:estimateHref',
            element: <EstimatePage />,
          },
          // {
          //   path: '/admin/create',
          //   element: <CreateContactPage />
          // },
        ],
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
  // , { basename: '/MadDog/'}
);