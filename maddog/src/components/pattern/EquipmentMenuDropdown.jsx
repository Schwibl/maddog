import { useEffect, useState } from 'react';
import styles from './EquipmentMenuDropdown.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openModalEquipment } from '../../redux/features/modalsSlice';
import { setSelectedEquipment } from '../../redux/features/equipmentSlice';

const EquipmentMenuDropdown = ({equipmentId, setShowEditModal}) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const { equipmentList } = useSelector(state => state.equipment);

  const handleAction = (action) => {
    setSelectedAction(action);
    setShowMenu(false);
  };

  useEffect(() => {
    if (selectedAction) {
      if(selectedAction === 'edit') {
        const selectedEquipment = equipmentList.find(equipment => equipment.id === equipmentId);  
        dispatch(setSelectedEquipment(selectedEquipment));
        setShowEditModal(true);
      }
    }
    setSelectedAction(null);
  }, [selectedAction]);

  return <div className={styles.equipmentMenuDropdown}>
    <div className={styles.equipmentMenuDropdown__head} onClick={() => setShowMenu(!showMenu)}>
      <span>Выберите действие</span>
    </div>
    {showMenu && <div className={styles.equipmentMenuDropdown__body}>
      <div className={styles.equipmentMenuDropdown__menuItem} onClick={() => handleAction('edit')}>
        <span>Редактировать</span>
      </div>
      <div className={styles.equipmentMenuDropdown__menuItem} onClick={() => handleAction('repair')}>
        <span>В ремонт</span>
      </div>
      <div className={styles.equipmentMenuDropdown__menuItem} onClick={() => handleAction('writeOff')}>
        <span>Списано (продано)</span>
      </div>
      <div className={styles.equipmentMenuDropdown__menuItem} onClick={() => handleAction('returnToStock')}>
        <span>Вернуть на склад</span>
      </div>
    </div>}
  </div>;
};

export default EquipmentMenuDropdown;