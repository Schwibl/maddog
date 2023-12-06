import NavBar from '../components/navbar/NavBar';
import styles from './AdminPage.module.scss';

export default function AdminPage (props) {
    return (
        <div className={styles.container}>
            <NavBar />
            <section className={styles.adminPage}>
                <h1 className={styles.title}>Администраторы</h1>
                <div className={currentAdmins}></div>
            </section>
        </div>
    )
}