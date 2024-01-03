import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Layout } from './layouts/Layout';
import { NotFound } from './Pages/404/404';
import ProjectPage from './Pages/ProjectsPage/ProjectPage';
import ContactsPage from './Pages/ContactsPage/ContactsPage';
import AdminPage from './adminPage/AdminPage';
import EstimatePage from './Pages/EstimatePage/EstimatePage';

// import CreateContactPage from './Pages/CreateContactPage/CreateContactPage';

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
          path: '/projects',
          element: <ProjectPage />,
        },
        {
          path: '/admin',
          element: <AdminPage />,
        },
        {
          path: '/contacts',
          element: <ContactsPage />,
        },
        {
          path: 'estimate/:estimateHref',
          element: <EstimatePage />
        },
        // {
        //   path: 'create',
        //   element: <CreateContactPage />
        // },
      ]
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]
  // , { basename: '/MadDog/'}
  );