import React from 'react';

const UserContext = React.createContext({
  id: 0,
  name: '',
  role: '',
  contacts: '',
});

export default UserContext;
