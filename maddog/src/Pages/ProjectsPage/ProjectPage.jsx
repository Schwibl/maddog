import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getAllTypesOfStatuses } from '../../actions/equipmentApi';
import { deleteProjectById, getAllProjects, getProjectsStatuses, getProjectsTypes } from '../../actions/projectsApi';
import Button from '../../components/button/Button';
import Icon from '../../components/Icon/Icon';
import { setListPage } from '../../redux/features/projectsSlice';

import CreateProjectModal from './CreateProjectModal';
import ProjectTable from './ProjectTable';

import styles from './ProjectPage.module.scss';
import { getAllContacts } from '../../actions/contactsApi';

function ProjectPage() {
  const dispatch = useDispatch();

  const {listPage, selectedProject, projectsTypesList, projectsStatusesList} = useSelector(state => state.projects);
  const {contacts} = useSelector(state => state.contacts);

  const [searchValue, setSearchValue] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterState, setFilterState] = useState({
  });

  useEffect(() => {
    dispatch(getAllProjects(filterState));
    if (projectsTypesList.length === 0) {
      dispatch(getProjectsTypes());
    }
    if (projectsStatusesList.length === 0) {
      dispatch(getProjectsStatuses());
    }
    if (contacts.length === 0) {
      dispatch(getAllContacts());
    }
  }, []);

  useEffect(() => {
    dispatch(getAllProjects({...filterState}));
  }, [filterState]);

  return (
    <div className={styles.container}>
      <section className={styles.projectPage}>
        <div className={styles.actionContainer}>
          <div className={styles.buttonContainer}>
            <Button className={styles.create} type='button' onClick={() => {setShowCreateModal(true);}}>
              Создать
            </Button>
            <Button className={styles.delete} 
              type='button' 
              onClick={() => {
                if(confirm(`Вы действительно хотите удалить проект "${selectedProject.name}"?`)) {  
                  dispatch(deleteProjectById({id: selectedProject.id}));
                  setShowDeleteModal(false);
                }
              }}>
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
            <Button className={styles.filter + ' ' + (!filterState.classification ? styles.filterActive : '')} type='button' 
              onClick={() => {
                let newFilterState = {...filterState};
                delete newFilterState.classification;
                setFilterState(newFilterState);
              }}>
              Все
            </Button>
            {projectsTypesList.map((typeObj, index) => (
              <Button
                className={styles.filter + ' ' + (filterState.classification === typeObj.value ? styles.filterActive : '')}
                key={index}
                type='button'
                onClick={() => setFilterState({...filterState, classification: typeObj.value})}
              >
                {typeObj.text}
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
      </section>
      {showCreateModal && <CreateProjectModal closeCreateProjectModal={() => setShowCreateModal(false)} />}
    </div>
  );
}

export default ProjectPage;
