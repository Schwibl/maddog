import React from 'react';

const AdminsContext = React.createContext({
  id: 0,
  name: '',
  role: '',
  contacts: '',
});

export default AdminsContext;
