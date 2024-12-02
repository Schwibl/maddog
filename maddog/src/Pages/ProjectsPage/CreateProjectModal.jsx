import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './ProjectPage.module.scss';
import Datepicker from '../../components/datepicker/Datepicker';
import SwitchShifts from '../../components/SwitchShifts/SwitchShifts';
import { createProject } from '../../actions/projectsApi';
import SelectEquipmentToCreateProjectModal from './SelectEquipmentToCreateProjectModal';
import { removeSelectedEquipment, clearSelectedEquipment } from '../../redux/features/projectsSlice';

const generateDateRange = (start, end) => {
  const dates = [];
  const currentDate = new Date(start);
  const endDate = new Date(end);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
const changeValueTypeToIntIfRequired = (name, value) => {
  if (
    name === 'number' || 
    name === 'quantity' || 
    name === 'employeeId' || 
    name === 'contactId' || 
    name === 'discount' || 
    name === 'sum' || 
    name === 'finalSumUsn' || 
    name === 'priceTools' || 
    name === 'priceWork' || 
    name === 'discountByProject' || 
    name === 'sumWithDiscount' || 
    name === 'received' || 
    name === 'remainder'
  ) {
    return parseInt(value);
  }
  return value;
};

function CreateProjectModal({closeCreateProjectModal}) {
  const dispatch = useDispatch();

  const {projectsTypesList, projectsStatusesList} = useSelector(state => state.projects);
  const {contacts} = useSelector(state => state.contacts);
  const selectedEquipment = useSelector((state) => state.projects.selectedEquipment);

  const [formData, setFormData] = useState({
    number: 1,
    classification: projectsTypesList[0]?.text || "Разовый",
    status: projectsStatusesList[0]?.text || "Создан",
    name: '',
    typeLease: 'STRAIGHT',
    quantity: 0,
    employeeId: 0,
    start: new Date().toISOString().split('T')[0],
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    contactId: 0,
    phoneNumber: '',
    photos: [],
    discount: 0,
    note: '',
    sum: 0,
    finalSumUsn: 0,
    priceTools: 0,
    priceWork: 0,
    discountByProject: 0,
    sumWithDiscount: 0,
    received: 0,
    remainder: 0,
    tools: [],
    workingShifts: []
  });
  const [showShifts, setShowShifts] = useState(false);
  const [workingDays, setWorkingDays] = useState(generateDateRange(formData.start, formData.end));
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  const numberRef = useRef(null);
  const nameRef = useRef(null);
  const contactRef = useRef(null);
  const quantityRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const receivedRef = useRef(null);
  const remainderRef = useRef(null);

  useEffect(() => {
    setWorkingDays(generateDateRange(formData.start, formData.end));
  }, [formData.start, formData.end]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      tools: selectedEquipment.map(equipment => equipment.id)
    }));

    const equipmentButton = document.querySelector('[data-equipment-select]');
    if (equipmentButton) {
      if (selectedEquipment.length > 0) {
        equipmentButton.classList.remove(styles.invalid);
      }
    }
  }, [selectedEquipment]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedEquipment());
    };
  }, []);

  useEffect(() => {
    
    console.log(formData);
      
  }, [formData]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    
    value = changeValueTypeToIntIfRequired(name, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const refMap = {
      'number': numberRef,
      'name': nameRef,
      'contactId': contactRef,
      'quantity': quantityRef,
      'start': startRef,
      'end': endRef,
      'received': receivedRef,
      'remainder': remainderRef
    };

    const ref = refMap[name];
    if (ref && ref.current) {
      if (
        (typeof value === 'number' && value !== 0) ||
        (typeof value === 'string' && value.trim() !== '') ||
        (name === 'contactId' && value !== 0)
      ) {
        ref.current.classList.remove(styles.invalid);
      }
    }
  };

  const checkFormIsValid = () => {
    const invalidFields = [];
    
    if (formData.number === 0) invalidFields.push({ ref: numberRef, name: 'number' });
    if (!formData.name) invalidFields.push({ ref: nameRef, name: 'name' });
    if (formData.contactId === 0) invalidFields.push({ ref: contactRef, name: 'contact' });
    if (formData.quantity === 0) invalidFields.push({ ref: quantityRef, name: 'quantity' });
    if (!formData.start) invalidFields.push({ ref: startRef, name: 'start date' });
    if (!formData.end) invalidFields.push({ ref: endRef, name: 'end date' });
    if (formData.received === 0) invalidFields.push({ ref: receivedRef, name: 'received' });
    if (formData.remainder === 0) invalidFields.push({ ref: remainderRef, name: 'remainder' });
    if (selectedEquipment.length === 0) invalidFields.push({ name: 'equipment' });

    [numberRef, nameRef, contactRef, quantityRef, startRef, endRef, receivedRef, remainderRef]
      .forEach(ref => ref.current?.classList.remove(styles.invalid));

    if (invalidFields.length > 0) {
      invalidFields.forEach(field => field.ref?.current?.classList.add(styles.invalid));

      const firstInvalid = invalidFields[0];
      if (firstInvalid.name === 'equipment') {
        setShowEquipmentModal(true);
      } else {
        firstInvalid.ref.current?.focus();
      }

      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (checkFormIsValid()) {
      const projectData = {
        ...formData,
        start: new Date(formData.start + 'T00:00:00').toISOString(),
        end: new Date(formData.end + 'T00:00:00').toISOString(),
        workingShifts: formData.workingShifts.map(shift => {
          try {
            return {
              dateShift: new Date(shift.date).toISOString().split('T')[0],
              typeShift: shift.type
            };
          } catch (error) {
            console.error('Invalid date in working shifts:', shift.date);
            return null;
          }
        }).filter(Boolean)
      };

      dispatch(createProject(projectData));
      closeCreateProjectModal();
    }
  };

  return (
    <>
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
                  ref={numberRef}
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
                  ref={nameRef}
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
                <select
                  name="classification"
                  value={formData.classification}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                >
                  {projectsTypesList.map(type => <option value={type.value}>{type.text}</option>)}
                </select>
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Контакт *</span>
                <select
                  ref={contactRef}
                  name="contactId"
                  value={formData.contactId}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                >
                  <option value={0}>Выберите контакт</option>
                  {contacts.map(contact => <option key={contact.id} value={contact.id}>{contact.name}</option>)}
                </select>
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Статус</span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                >
                  {projectsStatusesList.map(status => <option value={status.value}>{status.text}</option>)}
                </select>
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Тип аренды</span>
                <select
                  name="typeLease"
                  value={formData.typeLease}
                  onChange={handleInputChange}
                  className={styles.input}
                >
                  <option value="STRAIGHT">Прямая</option>
                  <option value="SUBLEASE">Даем в субаренду</option>
                </select>
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Количество *</span>
                <input
                  ref={quantityRef}
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Оборудование *</span>
                <button 
                  type="button" 
                  className={styles.input}
                  data-equipment-select
                  onClick={() => setShowEquipmentModal(true)}
                >
                  Выбрать оборудование ({selectedEquipment.length})
                </button>
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Дата начала *</span>
                <input
                  ref={startRef}
                  type="date"
                  name="start"
                  value={formData.start}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Дата окончания *</span>
                <input
                  ref={endRef}
                  type="date"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Получено *</span>
                <input
                  ref={receivedRef}
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
                  ref={remainderRef}
                  type="number"
                  name="remainder"
                  value={formData.remainder}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Смены</span>
                    {workingDays.map((day, index) => (
                      <SwitchShifts 
                        day={day}
                        shifts={formData.workingShifts}
                        setShifts={(shifts) => setFormData(prev => ({...prev, workingShifts: shifts}))}
                      />
                  ))}
              </div>
            </div>

            <div className={styles.buttonBlock}>
              <button 
                type='button'
                className={styles.button}
                onClick={handleSubmit}>
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

      {showEquipmentModal && (
        <SelectEquipmentToCreateProjectModal
          isOpen={showEquipmentModal}
          onClose={() => setShowEquipmentModal(false)}
        />
      )}
    </>
  );
}

export default CreateProjectModal;
