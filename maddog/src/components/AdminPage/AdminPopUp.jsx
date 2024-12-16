import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '../../actions/adminApi';
import '../../styles/admin/admin.scss'; 

function AdminPopUp({ mode = 'create', user = null, onClose }) {
  const dispatch = useDispatch();
  const { roles, colors } = useSelector(state => state.admin);

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    phoneNumber: '',
    password: '',
    roles: roles[0],
    userColor: colors[0] || '#000000', // Default to first color or black
  });

  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        username: user.username,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        password: user.password,
        roles: user.roles,
        userColor: user.userColor || colors[0] || '#000000',
      });
    }
  }, [mode, user, colors]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        await dispatch(createUser(formData));
      } else {
        await dispatch(updateUser({id: user.id, userData:{...formData}}));
      }
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <h2 className="admin-modal__title">
          {mode === 'create' ? 'Создать пользователя' : 'Редактировать пользователя'}
        </h2>
        <form onSubmit={handleSubmit} className="admin-modal__form">
          <div className="admin-modal__form-field">
            <label>Логин:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="admin-modal__form-field">
            <label>Пароль:</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="admin-modal__form-field">
            <label>ФИО:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="admin-modal__form-field">
            <label>Телефон:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="admin-modal__form-field">
            <label>Роль:</label>
            <select
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              required
              className="admin-modal__form-field-select"
            >
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-modal__form-field">
            <label>Цвет пользователя:</label>
            <select
              name="userColor"
              value={formData.userColor}
              onChange={handleChange}
              required
              className="admin-modal__form-field-select"
            >
              {colors.map((color, index) => (
                <option key={index} value={color} style={{ backgroundColor: color }}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-modal__actions">
            <button type="submit" className="admin-modal__submit-button">
              {mode === 'create' ? 'Создать' : 'Сохранить'}
            </button>
            <button
              type="button"
              className="admin-modal__cancel-button"
              onClick={onClose}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPopUp;
