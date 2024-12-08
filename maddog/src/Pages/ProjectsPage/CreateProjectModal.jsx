import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ProjectPage.module.scss';
import SwitchShifts from '../../components/SwitchShifts/SwitchShifts';
import { createProject } from '../../actions/projectsApi';
import SelectEquipmentToCreateProjectModal from './SelectEquipmentToCreateProjectModal';
import {  clearSelectedEquipment } from '../../redux/features/projectsSlice';

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

  const {projectsTypesList, projectsStatusesList, leaseTypesList} = useSelector(state => state.projects);
  const {contacts} = useSelector(state => state.contacts);
  const selectedEquipment = useSelector((state) => state.projects.selectedEquipment);

  const [formData, setFormData] = useState({
    number: 1,
    classification: projectsTypesList[0]?.value || "ONE_TIME",
    status: projectsStatusesList[0]?.value || "CREATE",
    name: '',
    typeLease: leaseTypesList[0]?.value || 'STRAIGHT',
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
    tools: [],
    workingShifts: []
  });

  const [workingDays, setWorkingDays] = useState(generateDateRange(formData.start, formData.end));
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [shouldShakeQuantity, setShouldShakeQuantity] = useState(false);

  const numberRef = useRef(null);
  const nameRef = useRef(null);
  const contactRef = useRef(null);
  const quantityRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const shiftsRef = useRef(null);
  const equipmentRef = useRef(null);
  const quantityInputRef = useRef(null);

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
  }, [dispatch]);

  useEffect(() => {
    if (formData.workingShifts.length !== formData.quantity) {
      setFormData(prev => ({
        ...prev,
        quantity: formData.workingShifts.length
      }));
      setShouldShakeQuantity(true);
      setTimeout(() => setShouldShakeQuantity(false), 400); // Duration of shake animation
    }
  }, [formData.workingShifts]);

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
      'end': endRef
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
    if (selectedEquipment.length === 0) invalidFields.push({ ref: equipmentRef, name: 'equipment' });
    if (formData.workingShifts.length === 0) invalidFields.push({ ref: shiftsRef, name: 'shifts' });

    // Clear all validation styles
    [numberRef, nameRef, contactRef, quantityRef, startRef, endRef, shiftsRef, equipmentRef]
      .forEach(ref => {
        if (ref?.current) {
          ref.current.classList.remove(styles.invalid);
          if (ref === shiftsRef) {
            ref.current.parentElement?.classList.remove(styles.invalid);
          }
        }
      });

    if (invalidFields.length > 0) {
      invalidFields.forEach(field => {
        if (field.ref?.current) {
          field.ref.current.classList.add(styles.invalid);
          if (field.ref === shiftsRef) {
            field.ref.current.parentElement?.classList.add(styles.invalid);
          }
        }
      });

      const firstInvalid = invalidFields[0];
      if (firstInvalid.name === 'equipment') {
        setShowEquipmentModal(true);
      } else if (firstInvalid.ref?.current) {
        firstInvalid.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

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
            return null;
          }
        }).filter(Boolean)
      };

      dispatch(createProject(projectData))
        .unwrap()
        .then(() => {
          closeCreateProjectModal();
        })
        .catch((error) => {
          console.error('Failed to create project:', error);
        });
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
                  {leaseTypesList.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.text}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Оборудование *</span>
                <button 
                  ref={equipmentRef}
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
                <span className={styles.inputLabel}>Количество *</span>
                <input
                  ref={quantityInputRef}
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  className={`${styles.input} ${shouldShakeQuantity ? styles.shake : ''}`}
                />
              </div>

              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Смены *</span>
                <div ref={shiftsRef} className={styles.shiftsContainer}>
                  {workingDays.map((day, index) => (
                    <SwitchShifts 
                      key={index}
                      day={day}
                      shifts={formData.workingShifts}
                      setShifts={(shifts) => setFormData(prev => ({...prev, workingShifts: shifts}))}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.buttonBlock}>
              <button 
                type="button"
                className={styles.button}
                onClick={handleSubmit}
              >
                Создать
              </button>
              <button 
                type="button"
                className={styles.button}
                onClick={closeCreateProjectModal}
              >
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
