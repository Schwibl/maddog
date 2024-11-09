import React, { useContext } from 'react';

import AdminsContext from '../../context/AdminsContext';

import AdminRow from './AdminRow';

export default function AdminTable() {
  const { admins, updateAdmin, deleteAdmin } = useContext(AdminsContext); // Получаем функции из контекста

  // Проверяем, является ли admins массивом перед использованием map
  if (!Array.isArray(admins)) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div>
      {admins.map(({ id, login, name, role }) => (
        <AdminRow 
          key={id} 
          id={id} 
          login={login} 
          name={name} 
          role={role} 
          onUpdate={updateAdmin} // Передаем функцию обновления
          onDelete={deleteAdmin} // Передаем функцию удаления
        />
      ))}
    </div>
  );
}
