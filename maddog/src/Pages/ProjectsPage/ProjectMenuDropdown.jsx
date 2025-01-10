import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProjectById } from '../../actions/projectsApi';
import ProjectEstimatePopUp from '../../components/Estimate/ProjectEstimatePopUp';
import SelectEquipmentModal from './SelectEquipmentModal';
import styles from './ProjectPage.module.scss';

const ProjectMenuDropdown = ({ project, onEditProject }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  const handleEdit = () => {
    onEditProject(project);
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (confirm(`Вы действительно хотите удалить проект "${project.name}"?`)) {
      dispatch(deleteProjectById({ id: project.id }));
    }
    setShowMenu(false);
  };

  const handleOpenEstimate = () => {
    setShowEstimate(true);
    setShowMenu(false);
  };

  const handleOpenEquipmentModal = () => {
    setShowEquipmentModal(true);
    setShowMenu(false);
  };

  return (
    <>
      <div className={styles.projectMenuDropdown}>
        <div 
          className={styles.projectMenuDropdown__head} 
          onClick={() => setShowMenu(!showMenu)}
        >
          <span>Действия</span>
        </div>
        {showMenu && (
          <div className={styles.projectMenuDropdown__body}>
            <div 
              className={styles.projectMenuDropdown__menuItem} 
              onClick={handleEdit}
            >
              <span>Изменить</span>
            </div>
            <div 
              className={styles.projectMenuDropdown__menuItem} 
              onClick={handleOpenEstimate}
            >
              <span>Открыть смету</span>
            </div>
            <div 
              className={styles.projectMenuDropdown__menuItem} 
              onClick={handleOpenEquipmentModal}
            >
              <span>Прикрепить оборудование</span>
            </div>
            <div 
              className={styles.projectMenuDropdown__menuItem} 
              onClick={handleDelete}
            >
              <span>Удалить</span>
            </div>
          </div>
        )}
      </div>
      {showEstimate && (
        <ProjectEstimatePopUp 
          projectId={project.id} 
          onClose={() => setShowEstimate(false)}
        />
      )}
      {showEquipmentModal && (
        <SelectEquipmentModal
          isOpen={showEquipmentModal}
          onClose={() => setShowEquipmentModal(false)}
          projectId={project.id}
        />
      )}
    </>
  );
};

export default ProjectMenuDropdown; 