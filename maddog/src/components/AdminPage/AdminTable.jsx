import { useSelector } from 'react-redux';
import AdminRow from './AdminRow';
import "../../styles/admin/admin.scss";

function AdminTable({ searchValue, onEditUser }) {
  const { usersList } = useSelector(state => state.admin);

  const headers = [
    'Действия',
    'Логин',
    'Пароль',
    'ФИО',
    'Телефон',
    'Роль',
    'Цвет',
  ];



  return (
    <div className="admin-table">
      <div className="admin-table__header">
        {headers.map((header, index) => (
          <div className="admin-table__header-cell" key={index}>
            {header}
          </div>
        ))}
      </div>
      {usersList
        .filter((user) =>
          user.username?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.fullName?.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((user, index) => (
          <AdminRow 
            key={index} 
            {...user} 
            onEditUser={onEditUser}
          />
        ))}
    </div>
  );
}

export default AdminTable;
