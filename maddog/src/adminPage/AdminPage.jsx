import NavBar from '../components/navbar/NavBar';
import AdminRow from '../components/admin/AdminRow';
import styles from './AdminPage.module.scss';

// Тестовые данные
const admins = [
    {
        id: 0,
        login: 'skelorc',
        name: 'Petrov Ivan',
        role: 'ADMIN'
    },
    {
        id: 1,
        login: 'philipp',
        name: 'philipp boss',
        role: 'ADMIN'
    },
    {
        id: 2,
        login: 'adm',
        name: 'best admin',
        role: 'ADMIN'
    }
]

export default function AdminPage (props) {
    return (
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
                    <div className={styles.admins}>
                        {
                            admins.map(({ id, login, name, role }) => <AdminRow key={id} login={login} name={name} role={role} />)
                        }
                    </div>
                    <button>Новый админ</button>
                </div>
            </section>
        </div>
    )
}