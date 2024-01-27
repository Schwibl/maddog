import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from '../../../redux/features/contactsSlice';
import { closeModal } from '../../../redux/features/modalsSlice';

import styles from './../ContactsPage.module.scss';

const DeleteContactModal = () => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contacts.selectedContact);
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.containerModal}>
          <h2 className={styles.titleModal}>Удалить следующий контакт?</h2>
          <p className={styles.textModal}>{`${contact.name} (${contact.role})`}</p>
          <div className={styles.buttonBlock}>
            <button
              type='button'
              className={styles.button}
              onClick={() => {
                dispatch(deleteContact(contact.id));
                dispatch(closeModal());
              }}
            >
              Удалить
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

export default DeleteContactModal;
