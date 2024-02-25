import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  return <AuthContext.Provider value={{user, setUser, authCode, setAuthCode}}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;