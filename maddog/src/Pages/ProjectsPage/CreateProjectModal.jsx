import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


import styles from './ProjectPage.module.scss';


function CreateProjectModal({closeCreateProjectModal}) {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');

  return (
    <div className={styles.overlay} 
      onClick={(e) => {
        if (!e.target.closest('.modalContent')) {
          closeCreateProjectModal();
        }
      }}>
      <div className={[styles.modal, 'modalContent'].join(' ')}>
        <div className={styles.containerModal}>
          <h2 className={styles.titleModal}>Создать новый проект</h2>
          
          <div className={styles.inputBlock}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Название проекта</span>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Введите название проекта"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.buttonBlock}>
            <button 
              type='button'
              className={styles.button}
              onClick={() => {
                // TODO: Add project creation logic here
                console.log('Creating project:', projectName);
                closeCreateProjectModal();
              }}>
              Создать
            </button>
            <button 
              type='button'
              className={styles.button}
              onClick={closeCreateProjectModal}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;
