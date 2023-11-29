// import logo from './panel-logo2x.webp';
// import styles from './App.module.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import AuthorizePage from './authorizePage/AuthorizePage';
import ProjectPage from './projectsPages/ProjectPage';


function App() {
  return (
    <BrowserRouter className='App'>
      <Routes>
          <Route path="/" element={<AuthorizePage />} />
          <Route path="projects" element={<ProjectPage />} />
          {/* <Route path="contacts" element={<ContactsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
