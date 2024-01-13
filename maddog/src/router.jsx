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
export const router = createBrowserRouter(
  [
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
          ],
        },
        {
          path: '/contacts',
          element: <LayoutChild />,
          errorElement: <NotFound />,
          children: [
            {
              path: '/contacts',
              element: <ContactsPage />,
            },
          ],
        },
        {
          path: '/projects',
          element: <LayoutChild />,
          errorElement: <NotFound />,
          children: [
            {
              path: '/projects',
              element: <ProjectPage />,
            },
          ],
        },
        {
          path: '/estimate/:estimateHref',
          element: <LayoutChild />,
          errorElement: <NotFound />,
          children: [
            {
              path: '/estimate/:estimateHref',
              element: <EstimatePage />,
            },
          ],
        },
        // {
        //   path: '/create',
        //   element: <LayoutChild />,
        //   errorElement: <NotFound />,
        //   children: [
        //     {
        //       path: '/create',
        //       element: <CreateContactPage />
        //     },
        //   ],
        // },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]
  // , { basename: '/MadDog/'}
);
