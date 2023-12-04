import {
    Link
} from 'react-router-dom';
import styles from './ProjectPage.module.scss';
import NavBar from '../../components/navbar/NavBar';
import SearchSVG from './searchSVG';

const headers = [
    '#',
    'Проект',
    'Статус',
    'Контакт',
    'Телефон',
    'Начало аренды',
    'Окончание аренды',
    'Дата и время создания',
    'Сотрудник',
    'Примечание',
    'Тип',
    'Открыть смету',
  ];

function ProjectPage() {
    return (
        <div className={styles.container}>
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
                        <button className={styles.searchBtn} type='button'>
                            <SearchSVG />
                        </button>
                    </div>
                </div>
                <div className={styles.gridContainer}>
                    <div className={styles.gridRowHeader}>
                        {headers.map((header, index) => (
                            <div className={styles.gridHeader} key={index}>{header}</div>
                        ))}
                    </div>
                    <div className={styles.gridRow}>
                        <div className={styles.gridCell}>
                            <input type='checkbox' />
                        </div>
                        <div className={styles.gridCell}>
                            <a href='#'>Ссылка на проект</a>
                        </div>
                        <div className={styles.gridCell}>Создан</div>
                        <div className={styles.gridCell}>Иванов Сергей</div>
                        <div className={styles.gridCell}>+79887555454</div>
                        <div className={styles.gridCell}>02-10-2023 16:00</div>
                        <div className={styles.gridCell}>19-10-2023 04:00</div>
                        <div className={styles.gridCell}>31-10-2023 23:29</div>
                        <div className={styles.gridCell}>Petrov Ivan</div>
                        <div className={styles.gridCell}>Примечание</div>
                        <div className={styles.gridCell}>Разовый</div>
                        <div className={styles.gridCell}>
                            <a href='#'>Ссылка на смету</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProjectPage;
