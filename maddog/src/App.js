// import logo from './panel-logo2x.webp';
// import styles from './App.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminPage from './adminPage/AdminPage';
import AuthorizePage from './authorizePage/AuthorizePage';
import UserContext from './context/UserContext';
import ContactsPage from './Pages/ContactsPage/ContactsPage';
import ProjectPage from './projectsPages/projectPage/ProjectPage';
// import CreateContactPage from './Pages/CreateContactPage/CreateContactPage';

function App() {
  const user = {
    id: 123,
    role: 'admin',
    contacts: 'example@example.com',
    name: 'Skelork',
  };
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter className="App">
        <Routes>
          <Route path="/" element={<AuthorizePage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          {/* <Route path="create" element={<CreateContactPage />} /> */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
