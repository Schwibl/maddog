import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { Layout } from './layouts/Layout';
import { LayoutChild } from './layouts/LayoutChild';
import { NotFound } from './Pages/404/404';
import AdminPage from './Pages/AdminPage/AdminPage';
import ContactsPage from './Pages/ContactsPage/ContactsPage';
import EstimatePage from './Pages/EstimatePage/EstimatePage';
import NewProjectPage from './Pages/NewProjectPage/NewProjectPage';
import ProjectPage from './Pages/ProjectsPage/ProjectPage';
import RepairPage from './Pages/RepairPage/RepairPage';
import EquipmentPage from './Pages/EquipmentPage/EquipmentPage';

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
        {
          path: '/newProjectPage',
          element: <LayoutChild />,
          errorElement: <NotFound />,
          children: [
            {
              path: '/newProjectPage',
              element: <NewProjectPage />,
            },
          ],
        },
        {
          path: '/equipment', // Добавляем маршрут для страницы оборудования
          element: <LayoutChild />,
          errorElement: <NotFound />,
          children: [
            {
              path: '/equipment',
              element: <EquipmentPage />, // Компонент для страницы оборудования
            },
          ],
        },
        {
          path: '/repair',
          element: <LayoutChild />,
          errorElement: <NotFound />,
          children: [
            {
              path: '/repair',
              element: <RepairPage />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]
);
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
