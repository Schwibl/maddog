// import logo from './panel-logo2x.webp';
// import styles from './App.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AuthorizePage from './Pages/authorizePage/AuthorizePage';
// import CreateContactPage from './Pages/CreateContactPage/CreateContactPage';

function App({children}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthorizePage />
      {children}
    </LocalizationProvider>
  );
}

export default App;
