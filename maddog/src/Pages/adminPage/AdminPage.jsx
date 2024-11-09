import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import AdminEditor from '../../components/admin/AdminEditor';
import AdminTable from '../../components/admin/AdminTable';
import AdminsContext from '../../context/AdminsContext';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';


import styles from './AdminPage.module.scss';

const initialAdmins = [
  {
    id: 0,
    login: 'skelorc',
    name: 'Petrov Ivan',
    role: 'ADMIN',
    contact: '89889889888',
  },
  {
    id: 1,
    login: 'philipp',
    name: 'philipp boss',
    role: 'ADMIN',
    contact: '89889889888',
  },
  {
    id: 2,
    login: 'adm',
    name: 'best admin',
    role: 'ADMIN',
    contact: '89889889888',
  },
];

export default function AdminPage() {
  const [isNewAdmin, setIsNewAdmin] = useState(false);
  const [adminsList, setAdminsList] = useState(initialAdmins);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, role, navigate]);

  // Обработчик для обновления администратора
  const updateAdmin = (id, updatedAdmin) => {
    setAdminsList(prevList =>
      prevList.map(admin => admin.id === id ? { ...admin, ...updatedAdmin } : admin)
    );
  };

  // Обработчик для удаления администратора
  const deleteAdmin = (id) => {
    setAdminsList(prevList => prevList.filter(admin => admin.id !== id));
  };

  // Обработчик для добавления нового администратора
  const addNewAdmin = (newAdmin) => {
    const newAdminWithId = { ...newAdmin, id: adminsList.length }; // Генерация ID
    setAdminsList(prevList => [...prevList, newAdminWithId]);
    setIsNewAdmin(false); // Закрываем редактор
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AdminsContext.Provider value={{ admins: adminsList, updateAdmin, deleteAdmin }}>
      <section className={styles.adminPage}>
        <h1 className={styles.title}>Администраторы</h1>
        <div className={styles.currentAdmins}>
          <div className={styles.adminsHeader}>
            <p>Логин</p>
            <p>ФИО</p>
            <p>Роль</p>
            <div></div>
            <div></div>
          </div>
          <AdminTable />
          {isNewAdmin && (
            <AdminEditor onSave={addNewAdmin} handleClick={setIsNewAdmin} />
          )}
          <div className={styles.btnWrap}>
            <button className={styles.btnNew} onClick={() => setIsNewAdmin(true)}>
              Новый админ
            </button>
          </div>
        </div>
      </section>
    </AdminsContext.Provider>
  );
}
