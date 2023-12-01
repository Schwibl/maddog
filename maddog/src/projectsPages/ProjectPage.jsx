// import logo from './panel-logo2x.webp';
// import styles from './App.module.scss';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from 'react-router-dom';
import {
    Link
} from 'react-router-dom';
import styles from './ProjectPage.module.scss';
import NavBar from '../components/navbar/NavBar';


function ProjectPage() {
    return (
        <>
            <NavBar />
            <section className={styles.projectPage}>
                <div className={styles.buttonContainer}>
                    <Link to='/newProject'>
                        <button className={styles.create} name='create' type='button' value='Создать'>Создать</button>
                    </Link>
                    <button className={styles.delete} name='delete' type='button' value='Удалить'>Удалить</button>
                </div>
                <div className={styles.search}>
                    <input type="text" placeholder="Поиск" />
                </div>
                <div className={styles.filterContainer}>
                    <button className={styles.filter}>Все</button>
                    <button className={styles.filter}>Разовые</button>
                    <button className={styles.filter}>Длинный</button>
                    <button className={styles.filter}>Субаренда</button>
                    <button className={styles.filter}>Тест</button>
                    <div className={styles.calendar}>
                        <input type="date" name="date" />
                        <div className={styles.searchBtn}>
                            <img src="search-icon" alt="search" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProjectPage;
