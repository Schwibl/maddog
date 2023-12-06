import NavBar from '../components/navbar/NavBar';
import styles from './AdminPage.module.scss';

export default function AdminPage (props) {
    return (
        <div className={styles.container}>
            <NavBar />
            <section className={styles.adminPage}>
                <h1 className={styles.title}>Администраторы</h1>
                <div className={styles.currentAdmins}>
                    <div className={styles.anminsHeader}>
                        <div>Логин</div>
                        <div>ФИО</div>
                        <div>Роль</div>
                        <div></div>
                        <div></div>
                    </div>
                    <button>Новый админ</button>
                </div>
            </section>
        </div>
    )
}