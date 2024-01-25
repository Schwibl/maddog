// import logo from './panel-logo2x.webp';
// import styles from './App.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import UserContext from './context/UserContext';
import AuthorizePage from './Pages/authorizePage/AuthorizePage';
// import CreateContactPage from './Pages/CreateContactPage/CreateContactPage';

function App({children}) {
  const user = {
    id: 123,
    role: 'admin',
    contacts: 'example@example.com',
    name: 'Skelork',
  };
  return (
    <UserContext.Provider value={user}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthorizePage />
        {children}
      </LocalizationProvider>
    </UserContext.Provider>
  );
}

export default App;
