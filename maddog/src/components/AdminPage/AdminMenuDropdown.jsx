import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/adminApi';
import "../../styles/admin/admin.scss";

const AdminMenuDropdown = ({ user, onEditUser }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    onEditUser(user);
    setShowMenu(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await dispatch(deleteUser(user.id));
        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
    setShowMenu(false);
  };

  return (
    <div className="admin-menu-dropdown">
      <div 
        className="admin-menu-dropdown__head" 
        onClick={() => setShowMenu(!showMenu)}
      >
        <span>Действия</span>
      </div>
      {showMenu && (
        <div className="admin-menu-dropdown__body">
          <div 
            className="admin-menu-dropdown__menu-item" 
            onClick={handleEdit}
          >
            <span>Редактировать</span>
          </div>
          <div 
            className="admin-menu-dropdown__menu-item" 
            onClick={handleDelete}
          >
            <span>Удалить</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenuDropdown; 


