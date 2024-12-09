import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/adminApi';
import "../../styles/admin/admin.scss";

function AdminRow({ username, fullName, phoneNumber, roles, active, onEditUser, id }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await dispatch(deleteUser(id));
        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="admin-row">
      <div className="admin-row__cell">
        <div className="admin-row__actions">
          <button
            className="admin-row__edit-button"
            onClick={() => onEditUser({ id, username, fullName, phoneNumber, roles, active })}
          >
            Редактировать
          </button>
          <button
            className="admin-row__delete-button"
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      </div>
      <div className="admin-row__cell">{username}</div>
      <div className="admin-row__cell">{fullName}</div>
      <div className="admin-row__cell">{phoneNumber}</div>
      <div className="admin-row__cell">{roles}</div>
      <div className="admin-row__cell">
        <span className={`admin-row__status ${active ? 'admin-row__status--active' : 'admin-row__status--inactive'}`}>
          {active ? 'Активен' : 'Неактивен'}
        </span>
      </div>
    </div>
  );
}

export default AdminRow;
