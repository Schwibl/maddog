// import logo from './panel-logo2x.webp';
// import styles from './App.module.scss';
import AuthorizePage from './authorizePage/AuthorizePage';
import UserContext from './context/UserContext';
// import CreateContactPage from './Pages/CreateContactPage/CreateContactPage';

function App() {
  const user = {
    id: 123,
    role: 'admin',
    contacts: 'example@example.com',
    name: 'Skelork',
  };
  return <UserContext.Provider value={user}>
    <AuthorizePage />
  </UserContext.Provider>;
}

export default App;
