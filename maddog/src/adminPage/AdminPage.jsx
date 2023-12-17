import { useState } from 'react';

import AdminEditor from '../components/admin/AdminEditor';
import AdminTable from '../components/admin/AdminTable';
import NavBar from '../components/navbar/NavBar';
import AdminsContext from '../context/AdminsContext';

import styles from './AdminPage.module.scss';


// Тестовые данные
const admins = [
  {
    id: 0,
    login: 'skelorc',
    name: 'Petrov Ivan',
    role: 'ADMIN',
    contact: '89889889888'
  },
  {
    id: 1,
    login: 'philipp',
    name: 'philipp boss',
    role: 'ADMIN',
    contact: '89889889888'
  },
  {
    id: 2,
    login: 'adm',
    name: 'best admin',
    role: 'ADMIN',
    contact: '89889889888'
  }
];

export default function AdminPage (props) {
  const [isNewAdmin, setisNewAdmin] =useState(false);

  return (
    <AdminsContext.Provider value={admins}>
      <div className={styles.container}>
        <NavBar />
        <section className={styles.adminPage}>
          <h1 className={styles.title}>Администраторы</h1>
          <div className={styles.currentAdmins}>
            <div className={styles.anminsHeader}>
              <p>Логин</p>
              <p>ФИО</p>
              <p>Роль</p>
              <div></div>
              <div></div>
            </div>
            <AdminTable />
            {!isNewAdmin || <AdminEditor handleClick={setisNewAdmin}/>}
            <div className={styles.btnWrap}>
              <button className={styles.btnNew} onClick={()=> setisNewAdmin(!isNewAdmin)}>Новый админ</button>
            </div>
          </div>
        </section>
      </div>

    </AdminsContext.Provider>
  );
}