import { useState } from 'react';

import Icon from '../Icon/Icon';

import AdminEditor from './AdminEditor';


import styles from './AdminRow.module.scss';

export default function AdminRow({ login, name, role, id, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);

  // Обработчик для удаления администратора
  const handleDelete = () => {
    onDelete(id); // Вызываем функцию удаления
  };

  // Обработчик для сохранения изменений администратора
  const handleSave = (updatedAdmin) => {
    onUpdate(id, updatedAdmin); // Вызываем функцию обновления с новыми данными
    setIsEdit(false); // Закрываем режим редактирования
  };

  return (
    <>
      <div className={styles.wrap}>
        <p className={styles.text}>{login}</p>
        <p className={styles.text}>{name}</p>
        <p className={styles.text}>{role}</p>
        <button className={styles.btn} onClick={() => setIsEdit(!isEdit)}>
          <Icon iconId='edit'/>
        </button>
        <button className={styles.btn} onClick={handleDelete}>
          <Icon iconId='delete'/>
        </button>
      </div>
      {isEdit && (
        <AdminEditor 
          id={id} 
          login={login} 
          name={name} 
          role={role} 
          onSave={handleSave} // Передаем функцию сохранения
          handleClick={setIsEdit} 
        />
      )}
    </>
  );
}
