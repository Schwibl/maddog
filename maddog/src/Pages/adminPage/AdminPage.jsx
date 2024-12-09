import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getManyUsers, getUsersRoles, getUsersColors } from '../../actions/adminApi';
import { setListPage } from '../../redux/features/adminSlice';
import '../../styles/admin/admin.scss';
import AdminTable from '../../components/AdminPage/AdminTable';
import AdminPopUp from '../../components/AdminPage/AdminPopUp';

function AdminPage() {
  const dispatch = useDispatch();
  const adminState = useSelector(state => state.admin) || {};
  const { listPage = { page: 0, size: 20, totalPages: 0 } } = adminState;
  
  const [searchValue, setSearchValue] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setUserToEdit(null);
  };

  useEffect(() => {
    dispatch(getManyUsers());
    dispatch(getUsersRoles());
    dispatch(getUsersColors());
  }, [dispatch, listPage.page, listPage.size]);

  return (
    <div className="admin-page">
      <section className="admin-page__content">
        <div className="admin-page__header">
          <h1>Управление пользователями</h1>
          <div className="admin-page__actions">
            <input
              type="text"
              placeholder="Поиск пользователей..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="admin-page__search"
            />
            <button
              className="admin-page__create-btn"
              onClick={() => setShowCreateModal(true)}
            >
              Создать пользователя
            </button>
          </div>
        </div>

        <AdminTable 
          searchValue={searchValue}
          onEditUser={handleEditUser}
        />

        <div className="admin-page__pagination">
          {listPage.page > 0 && (
            <button 
              onClick={() => {
                dispatch(setListPage({ ...listPage, page: listPage.page - 1 }));
              }}
            >
              Предыдущая
            </button>
          )}
          <span>Страница {listPage.page + 1} из {listPage.totalPages}</span>
          {listPage.page < listPage.totalPages - 1 && (
            <button 
              onClick={() => {
                dispatch(setListPage({ ...listPage, page: listPage.page + 1 }));
              }}
            >
              Следующая
            </button>
          )}
        </div>
      </section>

      {showCreateModal && (
        <AdminPopUp 
          mode="create"
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {showEditModal && userToEdit && (
        <AdminPopUp 
          mode="edit"
          user={userToEdit}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}

export default AdminPage;
