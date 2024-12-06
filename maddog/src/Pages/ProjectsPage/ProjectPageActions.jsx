import React from 'react';
import Button from '../../components/button/Button';
import Icon from '../../components/Icon/Icon';
import styles from './ProjectPage.module.scss';
import { useSelector } from 'react-redux';

const ProjectPageActions = ({ setShowCreateModal, setShowEditModal, searchValue, setSearchValue, filterState, setFilterState }) => {
  const {  projectsTypesList } = useSelector(state => state.projects);


  return (
    <>
      <div className={styles.actionContainer}>
        <div className={styles.buttonContainer}>
          <Button 
            className={styles.create} 
            type='button' 
            onClick={() => setShowCreateModal(true)}
          >
            Создать
          </Button>
          {/* <Button 
            className={styles.edit} 
            type='button'
            onClick={() => setShowEditModal(true)}
            disabled={!selectedProject}
          >
            Изменить
          </Button>
          <Button 
            className={styles.delete} 
            type='button'
            onClick={handleDelete}
            disabled={!selectedProject}
          >
            Удалить
          </Button> */}
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
          <Button 
            className={styles.filter + ' ' + (!filterState.classification ? styles.filterActive : '')} 
            type='button' 
            onClick={() => {
              const newFilterState = {...filterState};
              delete newFilterState.classification;
              setFilterState(newFilterState);
            }}
          >
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
    </>
  );
};

export default ProjectPageActions; 