// import logo from './panel-logo2x.webp';
// import styles from './App.module.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import AuthorizePage from './authorizePage/AuthorizePage';
import ProjectPage from './projectsPages/projectPage/ProjectPage'
import AdminPage from './adminPage/AdminPage';
import UserContext from './context/UserContext';

function App() {
    const user = {
        id: 123,
        role: 'admin',
        contacts: 'example@example.com',
        name: 'Skelork',
    };
    return (
        <UserContext.Provider value={user}>
            <BrowserRouter className='App'>
                <Routes>
                    <Route path='/' element={<AuthorizePage />} />
                    <Route path='projects' element={<ProjectPage />} />
                    <Route path='admin' element={<AdminPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
