import dayjs from 'dayjs';
import React, { useState } from 'react';


import styles from './Repair.module.scss';

function RepairFormModal({ isOpen, onClose, onSave, equipmentList, token }) {
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('');
  const [responsible, setResponsible] = useState('');
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState(''); // Оставляем для возможной обработки ошибок в будущем

  const validateForm = () => {
    const newErrors = {};

    if (!status) {
      newErrors.status = 'Статус обязателен';
    }

    if (!selectedEquipment) {
      newErrors.equipment = 'Необходимо выбрать оборудование';
    }

    const phonePattern = /^[+]?[0-9\s\-]+$/;
    if (!phonePattern.test(phone)) {
      newErrors.phone = 'Введите корректный телефонный номер';
    }

    if (!responsible) {
      newErrors.responsible = 'Имя ответственного обязательно';
    }

    if (!startDate || !dayjs(startDate).isValid()) {
      newErrors.startDate = 'Неверная дата начала ремонта';
    }

    if (endDate && !dayjs(endDate).isValid()) {
      newErrors.endDate = 'Неверная дата окончания ремонта';
    }

    if (startDate && endDate && dayjs(endDate).isBefore(dayjs(startDate))) {
      newErrors.endDate = 'Дата окончания не может быть раньше даты начала';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const formData = {
      status,
      phone,
      responsiblePerson: responsible,
      startDate,
      endDate,
      equipment: selectedEquipment,
    };

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Создать ремонт</h2>
        {fetchError && <span className={styles.error}>{fetchError}</span>}

        <div className={styles.formGroup}>
          <label htmlFor="status">Статус</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Выберите статус</option>
            <option value="В ремонте">В ремонте</option>
            <option value="В ожидании">В ожидании</option>
          </select>
          {errors.status && <span className={styles.error}>{errors.status}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="equipment">Оборудование</label>
          <select
            id="equipment"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
          >
            <option value="">Выберите оборудование</option>
            {equipmentList.length > 0 ? (
              equipmentList.map((equipment) => (
                <option key={equipment.id} value={equipment.id}>
                  {equipment.name}
                </option>
              ))
            ) : (
              <option value="">Нет доступного оборудования</option>
            )}
          </select>
          {errors.equipment && <span className={styles.error}>{errors.equipment}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Введите телефон"
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="responsible">Ответственный</label>
          <input
            type="text"
            id="responsible"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            placeholder="Введите имя ответственного"
          />
          {errors.responsible && <span className={styles.error}>{errors.responsible}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="startDate">Начало ремонта</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endDate">Окончание ремонта</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default RepairFormModal;
