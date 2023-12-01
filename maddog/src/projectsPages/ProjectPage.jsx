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
                    <input type='text' placeholder='Поиск' />
                </div>
                <div className={styles.filterContainer}>
                    <button className={styles.filter}>Все</button>
                    <button className={styles.filter}>Разовые</button>
                    <button className={styles.filter}>Длинный</button>
                    <button className={styles.filter}>Субаренда</button>
                    <button className={styles.filter}>Тест</button>
                    <div className={styles.calendar}>
                        <input type='date' name='date' />
                        <div className={styles.searchBtn}>
                            <img src='search-icon' alt='search' />
                        </div>
                    </div>
                </div>
                <div className={styles.gridContainer}>
                    <div className={styles.gridRow}>
                        <div className={styles.gridHeader}>#</div>
                        <div className={styles.gridHeader}>Проект</div>
                        <div className={styles.gridHeader}>Статус</div>
                        <div className={styles.gridHeader}>Контакт</div>
                        <div className={styles.gridHeader}>Телефон</div>
                        <div className={styles.gridHeader}>Начало аренды</div>
                        <div className={styles.gridHeader}>Окончание аренды</div>
                        <div className={styles.gridHeader}>Дата и время создания</div>
                        <div className={styles.gridHeader}>Сотрудник</div>
                        <div className={styles.gridHeader}>Примечание</div>
                        <div className={styles.gridHeader}>Тип</div>
                        <div className={styles.gridHeader}>Открыть смету</div>
                    </div>
                    <div className={styles.gridRow}>
                        <div className={styles.gridCell}><input type='checkbox'/></div>
                        <div className={styles.gridCell}><a href='#'>Ссылка на проект</a></div>
                        <div className={styles.gridCell}>Создан</div>
                        <div className={styles.gridCell}>Иванов Сергей</div>
                        <div className={styles.gridCell}>+79887555454</div>
                        <div className={styles.gridCell}>02-10-2023 16:00</div>
                        <div className={styles.gridCell}>19-10-2023 04:00</div>
                        <div className={styles.gridCell}>31-10-2023 23:29</div>
                        <div className={styles.gridCell}>Petrov Ivan</div>
                        <div className={styles.gridCell}>Примечание</div>
                        <div className={styles.gridCell}>Разовый</div>
                        <div className={styles.gridCell}><a href='#'>Ссылка на смету</a></div>
                    </div>
                    //TODO добавить стили и переписать на map
                </div>
            </section>
        </>
    );
}

export default ProjectPage;
