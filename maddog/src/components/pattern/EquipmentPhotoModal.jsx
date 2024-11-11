import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/features/modalsSlice';

import styles from './Pattern.module.scss';
import { useEffect } from 'react';


function EquipmentPhotoModal({ photoUrl }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('photoUrl', photoUrl);
  }, []);
  return (
    <div className={styles.equipmentModalOverlay} >
      <img src={photoUrl} alt="Фото оборудования" className={styles.equipmentPhotoInModal}/>
    </div>
  );
}
export default EquipmentPhotoModal;
