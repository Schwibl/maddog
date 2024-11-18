import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getAllProjects } from '../../actions/projectsApi';
import Button from '../../components/button/Button';
import Icon from '../../components/Icon/Icon';
import Modal from '../../components/Modal/index';
import NavBar from '../../components/Navbar/NavBar';
import { setListPage } from '../../redux/features/projectsSlice';

import ProjectTable from './ProjectTable';

import styles from './ProjectPage.module.scss';

function ProjectPage() {
  const dispatch = useDispatch();

  const {projectsList, listPage} = useSelector(state => state.projects);

  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    dispatch(getAllProjects({}));
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
        <ProjectTable searchValue={searchValue} />
        <div className={styles.paginator}>
          {
            listPage.page > 0 && (
              <button type="button" 
                onClick={() => {
                  if (listPage.page > 0) {
                    // if(selectedStatuses.length > 0) { 
                    //   dispatch(getEquipmentWithFilter({ activeFilters: { statusesTools: selectedStatuses }, page: listPage.page - 1, size: listPage.size }));
                    // } else {
                    //   dispatch(setListPage({ ...listPage, page: listPage.page - 1 }));
                    // }
                    dispatch(setListPage({ ...listPage, page: listPage.page - 1 }));
                  }
                }}
              >
                Предыдущая
              </button>
            )
          }
          <span className={styles.pageNumber}>Страница {listPage.page + 1} из {listPage.totalPages}</span>
          {
            listPage.page < listPage.totalPages - 1 && (
              <button type="button" 
                onClick={() => {
                  // if(selectedStatuses.length > 0) {
                  //   dispatch(getEquipmentWithFilter({ activeFilters: { statusesTools: selectedStatuses }, page: listPage.page + 1, size: listPage.size }));
                  // } else {
                  //   dispatch(setListPage({ ...listPage, page: listPage.page + 1 }));
                  // }
                  dispatch(setListPage({ ...listPage, page: listPage.page + 1 }));
                }}
              >
                Следующая
              </button>
            )
          }
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Создание проекта</h2>
          {/* <ProjectInfo addProject={addProject} /> */}
        </Modal>
      </section>
    </div>
  );
}

export default ProjectPage;
