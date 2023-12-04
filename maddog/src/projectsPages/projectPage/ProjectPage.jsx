import {
    Link
} from 'react-router-dom';
import styles from './ProjectPage.module.scss';
import NavBar from '../../components/navbar/NavBar';
import SearchSVG from './searchSVG';
import ProjectItem from './ProjectItem';

function ProjectPage() {
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

    const filters = [
        'Все',
        'Разовые',
        'Длинный',
        'Субаренда',
        'Тест',
    ];

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
                    {filters.map((filter, index) => (
                        <button className={styles.filter} key={index}>{filter}</button>
                    ))}
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
                    <ProjectItem projectName={'Ссылка на проект'}/>
                </div>
            </section>
        </div>
    );
}

export default ProjectPage;
