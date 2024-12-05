import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects, getProjectsStatuses, getProjectsTypes, getLeaseTypes } from '../../actions/projectsApi';
import { setListPage } from '../../redux/features/projectsSlice';
import CreateProjectModal from './CreateProjectModal';
import EditProjectModal from './EditProjectModal';
import ProjectTable from './ProjectTable';
import ProjectPageActions from './ProjectPageActions';
import styles from './ProjectPage.module.scss';
import { getAllContacts } from '../../actions/contactsApi';

function ProjectPage() {
  const dispatch = useDispatch();

  const {listPage, projectsTypesList, projectsStatusesList} = useSelector(state => state.projects);
  const {contacts} = useSelector(state => state.contacts);

  const [searchValue, setSearchValue] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterState, setFilterState] = useState({});

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
    dispatch(getLeaseTypes());
  }, []);

  useEffect(() => {
    dispatch(getAllProjects({...filterState}));
  }, [filterState]);

  return (
    <div className={styles.container}>
      <section className={styles.projectPage}>
        <ProjectPageActions 
          setShowCreateModal={setShowCreateModal}
          setShowEditModal={setShowEditModal}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          filterState={filterState}
          setFilterState={setFilterState}
        />
        <ProjectTable searchValue={searchValue} />
        <div className={styles.paginator}>
          {listPage.page > 0 && (
            <button 
              type="button" 
              onClick={() => {
                dispatch(setListPage({ ...listPage, page: listPage.page - 1 }));
              }}
            >
              Предыдущая
            </button>
          )}
          <span className={styles.pageNumber}>Страница {listPage.page + 1} из {listPage.totalPages}</span>
          {listPage.page < listPage.totalPages - 1 && (
            <button 
              type="button" 
              onClick={() => {
                dispatch(setListPage({ ...listPage, page: listPage.page + 1 }));
              }}
            >
              Следующая
            </button>
          )}
        </div>
      </section>
      {showCreateModal && <CreateProjectModal closeCreateProjectModal={() => setShowCreateModal(false)} />}
      {showEditModal && <EditProjectModal closeEditProjectModal={() => setShowEditModal(false)} />}
    </div>
  );
}

export default ProjectPage;
