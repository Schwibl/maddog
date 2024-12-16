import AdminMenuDropdown from './AdminMenuDropdown';
import "../../styles/admin/admin.scss";

function AdminRow({ username, fullName, password, phoneNumber, roles, active, onEditUser, id, userColor }) {
  return (
    <div className="admin-row">
      <div className="admin-row__cell">
        <AdminMenuDropdown 
          user={{ id, username, fullName, phoneNumber, roles, active, password, userColor }}
          onEditUser={onEditUser}
        />
      </div>
      <div className="admin-row__cell">{username}</div>
      <div className="admin-row__cell">{password}</div>
      <div className="admin-row__cell">{fullName}</div>
      <div className="admin-row__cell">{phoneNumber}</div>
      <div className="admin-row__cell">{roles}</div>
      <div className="admin-row__cell">
        <div 
          className="admin-row__color-indicator" 
          style={{ backgroundColor: userColor || '#000000' }}
          title={userColor}
        />
      </div>
    </div>
  );
}

export default AdminRow;
