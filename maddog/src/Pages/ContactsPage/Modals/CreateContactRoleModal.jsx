import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/features/modalsSlice';
import styles from './../ContactsPage.module.scss';
import { createContactRole } from '../../../actions/contactsApi';


const CreateContactRoleModal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.containerModal}>
          <h2 className={styles.titleModal}>Создать тип контакта</h2>
          <div className={styles.inputBlock}>
            <input className={styles.input} type='text' placeholder='Название' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.buttonBlock}>
            <button 
              type='button'
              className={styles.button}
              onClick={() => {
                if (name) {   
                  dispatch(createContactRole({name}));
                  dispatch(closeModal());
                }
              }}
            >
              Создать
            </button>
            <button
              type='button'
              className={styles.button}
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContactRoleModal;