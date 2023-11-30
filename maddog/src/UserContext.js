import React from 'react';

const UserContext = React.createContext({
  id: 0,
  role: '',
  contacts: '',
});

export default UserContext;
