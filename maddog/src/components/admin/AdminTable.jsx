import React, { useContext } from 'react';

import AdminsContext from '../../context/AdminsContext';

import AdminRow from './AdminRow';

export default function AdminTable (props) {

  const admins = useContext(AdminsContext);

  return (
    <div>
      { admins.map(({ id, login, name, role }) => <AdminRow key={id} login={login} name={name} role={role} id={id} />) }
    </div>
  );
}