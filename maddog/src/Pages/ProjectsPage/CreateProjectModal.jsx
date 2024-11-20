import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


import styles from './ProjectPage.module.scss';


function CreateProjectModal({closeCreateProjectModal}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    number: 0,
    classification: '',
    status: '',
    name: '',
    typeLease: '',
    quantity: 0,
    employeeId: 0,
    contactId: 0,
    phoneNumber: '',
    discount: 0,
    note: '',
    sum: 0,
    finalSumUsn: 0,
    priceTools: 0,
    priceWork: 0,
    discountByProject: 0,
    sumWithDiscount: 0,
    received: 0,
    remainder: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
              <span className={styles.inputLabel}>Номер проекта *</span>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Название проекта *</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Классификация *</span>
              <input
                type="text"
                name="classification"
                value={formData.classification}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Контакт *</span>
              <input
                type="number"
                name="contactId"
                value={formData.contactId}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Статус</span>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Тип аренды</span>
              <input
                type="text"
                name="typeLease"
                value={formData.typeLease}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Количество *</span>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Сотрудник</span>
              <input
                type="number"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Телефон</span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Скидка (%) *</span>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Примечание</span>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Сумма</span>
              <input
                type="number"
                name="sum"
                value={formData.sum}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Итоговая сумма УСН</span>
              <input
                type="number"
                name="finalSumUsn"
                value={formData.finalSumUsn}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Стоимость инструментов</span>
              <input
                type="number"
                name="priceTools"
                value={formData.priceTools}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Стоимость работы</span>
              <input
                type="number"
                name="priceWork"
                value={formData.priceWork}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Скидка по проекту</span>
              <input
                type="number"
                name="discountByProject"
                value={formData.discountByProject}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Сумма со скидкой</span>
              <input
                type="number"
                name="sumWithDiscount"
                value={formData.sumWithDiscount}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Получено *</span>
              <input
                type="number"
                name="received"
                value={formData.received}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Остаток *</span>
              <input
                type="number"
                name="remainder"
                value={formData.remainder}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.buttonBlock}>
            <button 
              type='button'
              className={styles.button}
              onClick={() => {
                // TODO: Add validation for required fields
                console.log('Creating project:', formData);
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
