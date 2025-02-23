import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProjectPage.module.scss';
import SwitchShifts from '../../components/SwitchShifts/SwitchShifts';
import { updateProjectById } from '../../actions/projectsApi';
import SelectEquipmentModal from './SelectEquipmentModal';
import { clearSelectedEquipment } from '../../redux/features/projectsSlice';

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

function EditProjectModal({ project, closeEditProjectModal }) {
  const dispatch = useDispatch();
  const { projectsTypesList, projectsStatusesList, leaseTypesList } = useSelector(state => state.projects);
  const { contacts } = useSelector(state => state.contacts);

  const [formData, setFormData] = useState({
    number: project?.number || 0,
    classification: project?.classification || projectsTypesList[0]?.value || "ONE_TIME",
    status: project?.status || projectsStatusesList[0]?.value || "CREATE",
    name: project?.name || '',
    typeLease: project?.typeLease || leaseTypesList[0]?.value || 'STRAIGHT',
    quantity: project?.quantity || 0,
    employeeId: project?.employeeId || 0,
    start: project?.start?.split('T')[0] || new Date().toISOString().split('T')[0],
    end: project?.end?.split('T')[0] || new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    contactId: project?.client?.id || 0,
    phoneNumber: project?.client?.phoneNumber || '',
    photos: project?.photos || [],
    discount: project?.discount || 0,
    note: project?.note || '',
    sum: project?.sum || 0,
    finalSumUsn: project?.finalSumUsn || 0,
    priceTools: project?.priceTools || 0,
    priceWork: project?.priceWork || 0,
    discountByProject: project?.discountByProject || 0,
    sumWithDiscount: project?.sumWithDiscount || 0,
    received: project?.received || 0,
    remainder: project?.remainder || 0,
    tools: project?.tools || [],
    workingShifts: project?.workingShifts || []
  });

  const [workingDays, setWorkingDays] = useState(generateDateRange(formData.start, formData.end));
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  // Refs for validation
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
    return () => {
      dispatch(clearSelectedEquipment());
    };
  }, [dispatch]);

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

    [numberRef, nameRef, contactRef, quantityRef, startRef, endRef, receivedRef, remainderRef]
      .forEach(ref => ref.current?.classList.remove(styles.invalid));

    if (invalidFields.length > 0) {
      invalidFields.forEach(field => field.ref?.current?.classList.add(styles.invalid));

      const firstInvalid = invalidFields[0];
      firstInvalid.ref.current?.focus();

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

      dispatch(updateProjectById({ id: project.id, ...projectData }))
        .unwrap()
        .then(() => {
          closeEditProjectModal();
        })
        .catch((error) => {
          console.error('Failed to update project:', error);
        });
    }
  };

  return (
    <>
      <div className={styles.overlay} 
        onClick={(e) => {
          if (!e.target.closest('.modalContent')) {
            closeEditProjectModal();
          }
        }}>
        <div className={[styles.modal, 'modalContent'].join(' ')}>
          <div className={styles.containerModal}>
            <h2 className={styles.titleModal}>Изменить проект</h2>
            
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
                  {projectsTypesList.map(type => (
                    <option key={type.value} value={type.value}>{type.text}</option>
                  ))}
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
                  {contacts.map(contact => (
                    <option key={contact.id} value={contact.id}>{contact.name}</option>
                  ))}
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
                  {projectsStatusesList.map(status => (
                    <option key={status.value} value={status.value}>{status.text}</option>
                  ))}
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
                    <option key={type.value} value={type.value}>{type.text}</option>
                  ))}
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
                <span className={styles.inputLabel}>Оборудование</span>
                <button 
                  type="button" 
                  className={styles.input}
                  data-equipment-select
                  onClick={() => setShowEquipmentModal(true)}
                >
                  В��брать оборудование ({formData.tools.length})
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
                <div className={styles.shiftsWrap}>
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
                type='button'
                className={styles.button}
                onClick={handleSubmit}
              >
                Сохранить
              </button>
              <button 
                type='button'
                className={styles.button}
                onClick={closeEditProjectModal}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEquipmentModal && (
        <SelectEquipmentModal
          isOpen={showEquipmentModal}
          onClose={() => setShowEquipmentModal(false)}
        />
      )}
    </>
  );
}

export default EditProjectModal; 