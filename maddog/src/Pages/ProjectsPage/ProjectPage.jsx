import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import Icon from '../../components/Icon/Icon';
import Modal from '../../components/Modal/index';
import NavBar from '../../components/Navbar/NavBar';
import ProjectInfo from '../../components/ProjectInfo/ProjectInfo';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

import ProjectTable from './ProjectTable';


import styles from './ProjectPage.module.scss';
import { useSelector } from 'react-redux';

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
    estimateHref: 'estimate1',
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
    estimateHref: 'estimate2',
  },
];

function ProjectPage() {
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.id) {
      navigate('/');
    }
  }, [session.id]);

  const [projects, setProjects] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/v1/projects');
      if (!response.ok) {
        throw new Error('Не удалось загрузить проекты');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filters = ['Все', 'Разовые', 'Длинный', 'Субаренда', 'Тест'];


  return (
    <div className={styles.container}>
      <Button onClick={toggleMenu} className={styles.menuBtn} style={{ position: 'fixed', top: '10px', left: '10px', zIndex: '2000' }}>
        Меню
      </Button>
      {/* Передаем состояние isMenuOpen и функцию toggleMenu в NavBar */}
      <div className={`${styles.navBar} ${isMenuOpen ? styles.open : ''}`}>
        <NavBar isMenuOpen={isMenuOpen} />
      </div>
      <section className={styles.projectPage}>
        <div className={styles.actionContainer}>
          <div className={styles.buttonContainer}>
            <Link to='/newProjectPage'>
              <Button className={styles.create} type='button' onClick={() => setIsModalOpen(true)}>
                Создать
              </Button>
            </Link>
            <Button className={styles.delete} type='button'>
              Удалить
            </Button>
          </div>
          <div className={styles.search}>
            <input
              type='text'
              placeholder='Поиск'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.headerBtnContainer}>
          <div className={styles.filterContainer}>
            {filters.map((filter, index) => (
              <Button
                className={styles.filter}
                key={index}
                type='button'
              >
                {filter}
              </Button>
            ))}
          </div>
          <div className={styles.calendar}>
            <input type='date' name='date'/>
            <Button className={styles.calendarSearchBtn} type='button'>
              <Icon iconId='search' />
            </Button>
          </div>
        </div>
        <ProjectTable projects={testProjects} searchValue={searchValue} />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProjectInfo addProject={addProject} />
        </Modal>
      </section>
    </div>
  );
}

export default ProjectPage;
