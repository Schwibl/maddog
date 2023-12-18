// import logo from './panel-logo2x.webp';
// import styles from './App.module.scss';
import UserContext from "./context/UserContext";
import AuthorizePage from './authorizePage/AuthorizePage';
// import CreateContactPage from './Pages/CreateContactPage/CreateContactPage';

function App() {
  const user = {
    id: 123,
    role: "admin",
    contacts: "example@example.com",
    name: "Skelork",
  };
  return <UserContext.Provider value={user}>
    <AuthorizePage />
  </UserContext.Provider>;
}

export default App;
