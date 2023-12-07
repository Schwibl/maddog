import NavBar from '../components/navbar/NavBar';
import AdminTable from '../components/admin/AdminTable';
import styles from './AdminPage.module.scss';
import AdminsContext from '../context/AdminsContext';
import { useState } from 'react';

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
]

export default function AdminPage (props) {

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
                    <button className={styles.btnNew}>Новый админ</button>
                </div>
            </section>
        </div>

        </AdminsContext.Provider>
    )
}