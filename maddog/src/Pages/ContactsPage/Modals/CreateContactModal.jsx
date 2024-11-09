import React, { useEffect, useRef, useState } from 'react';
import styles from './../ContactsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/features/modalsSlice';
import { createContact } from '../../../actions/contactsApi';
import { getCompanies } from '../../../actions/companiesApi';

// Create contact request body:
// {
//   "name": "string",
//   "phoneNumber": "string",
//   "company": "string",
//   "roleContactId": 0,
//   "photos": [
//     "string"
//   ],
//   "comment": "string"
// }


const CreateContactModal = () => {
  const dispatch = useDispatch();
  const possibleRoles = useSelector((state) => state.contacts.possibleRoles);
  const companies = useSelector((state) => state.companies.companies);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState(possibleRoles[0]?.id);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);

  const nameInput = useRef(null);
  const phoneNumberInput = useRef(null);
  const companyInput = useRef('');
  const roleInput = useRef(null);
  const commentInput = useRef(null);
  const photoInput = useRef(null);
  const photoLabel = useRef(null);

  const [formValid, setFormValid] = useState(true);

  const checkFormValid = () => {
    const valid = name && phoneNumber && role;
    if (valid) {
      setFormValid(true);
    } else {
      setFormValid(false);
      !name ? nameInput.current.classList.add(styles.invalid) : nameInput.current.classList.remove(styles.invalid);
      !phoneNumber ? phoneNumberInput.current.classList.add(styles.invalid) : phoneNumberInput.current.classList.remove(styles.invalid);
      !role ? roleInput.current.classList.add(styles.invalid) : roleInput.current.classList.remove(styles.invalid);
    }
    return valid;
  };

  const handlePhotoChange = () => {
    const files = Array.from(photoInput.current.files);
    
    const readAndEncodeFiles = async () => {
      const encodedFiles = await Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );
      setPhotos(encodedFiles);
    };

    readAndEncodeFiles();
  };


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.containerModal}>
          <h2 className={styles.titleModal}>Создать контакт</h2>
          <form>
            <div className={styles.inputBlock}>
              <input className={styles.input} type='text' placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)} ref={nameInput} />
              <input className={styles.input} type='text' placeholder='Номер телефона' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} ref={phoneNumberInput} />
              <select className={styles.input} value={company} onChange={(e) => setCompany(parseInt(e.target.value))} ref={companyInput}>
                {
                  [{id: '', name: 'Не выбрано'}, ...companies].map((item, index) => {
                    return (<option key={item.id} value={item.id} className={styles.option}>{item.name}</option>);
                  })
                };
              </select>
              <select name="role" id="role" className={styles.input} value={role} onChange={(e) => setRole(parseInt(e.target.value))} ref={roleInput}>
                {
                  possibleRoles.map((role) => {
                    return (<option key={role.id} value={role.id} className={styles.option}>{role.role}</option>);
                  })
                }
              </select>
              <label className={styles.input} ref={photoLabel}>
                <span className={styles.inputLabel}>Выбрать фото ({photos.length}/5)</span>
                <input 
                  className={styles.hiddenInput} 
                  type='file' 
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  ref={photoInput}
                />
              </label>
              <input className={styles.input} type='text' placeholder='Комментарий' value={comment} onChange={(e) => setComment(e.target.value)} ref={commentInput} />
            </div>
          </form>
          <div className={styles.buttonBlock}>
            <button 
              type='button'
              className={styles.button}
              onClick={() => {
                if (checkFormValid()) {
                  dispatch(createContact({ name, phoneNumber, company, role, comment, photos }));
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

export default CreateContactModal;
