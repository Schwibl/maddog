import { useState } from 'react';
import {
    Link
} from 'react-router-dom';
import styles from './ProjectPage.module.scss';
import NavBar from '../../components/navbar/NavBar';
import SearchSVG from './searchSVG';
import ProjectTable from './ProjectTable';
import Button from '../../components/button/Button';

// для проверки ProjectRow
const testProjects = [
  {
    projectHref: '/project1',
    projectName: 'Проект 1',
    status: 'Создан',
    contact: 'Иванов Сергей',
    phone: '+79887555454',
    startDate: '02-10-2023 16:00',
    endDate: '19-10-2023 04:00',
    createdDate: '31-10-2023 23:29',
    creator: 'Petrov Ivan',
    note: 'Примечание 1',
    type: 'Разовый',
    estimateHref: '/estimate1'
  },
  {
    projectHref: '/project2',
    projectName: 'Проект 2',
    status: 'Создан',
    contact: 'Сергеев Иван',
    phone: '+79887552211',
    startDate: '12-10-2023 10:00',
    endDate: '18-10-2023 18:00',
    createdDate: '11-10-2023 11:00',
    creator: 'Petrov Ivan',
    note: 'Примечание 2',
    type: 'Субаренда',
    estimateHref: '/estimate2'
  },
];

function ProjectPage() {
    const [searchValue, setSearchValue] = useState('');

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
                        <Button className={styles.create} type='button' name='create' value='Создать' children='Создать'/>
                    </Link>
                    <Button className={styles.delete} type='button' name='delete' value='Удалить' children='Удалить'/>
                </div>
                <div className={styles.search}>
                    <input type='text' placeholder='Поиск' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                <div className={styles.filterContainer}>
                    {filters.map((filter, index) => (
                        <Button className={styles.filter} key={index} type='button' name={filter} value={filter} children={filter}/>
                    ))}
                    <div className={styles.calendar}>
                        <input type='date' name='date' />
                        <Button className={styles.searchBtn} type='button' name='search' value='search'>
                            <SearchSVG />
                        </Button>
                    </div>
                </div>
                <ProjectTable projects={testProjects} searchValue={searchValue} />
            </section>
        </div>
    );
}

export default ProjectPage;
