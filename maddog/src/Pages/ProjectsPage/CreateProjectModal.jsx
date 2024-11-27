import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import styles from './ProjectPage.module.scss';
import Datepicker from '../../components/datepicker/Datepicker';
import SwitchShifts from '../../components/SwitchShifts/SwitchShifts';
// {
//   "number": 0,
//   "classification": "ONE_TIME",
//   "status": "CREATE",
//   "name": "string",
//   "typeLease": "STRAIGHT",
//   "quantity": 0,
//   "employeeId": 0,
//   "start": "2024-11-25T15:38:42.818Z",
//   "end": "2024-11-25T15:38:42.818Z",
//   "contactId": 0,
//   "phoneNumber": "string",
//   "photos": [
//     "string"
//   ],
//   "discount": 0,
//   "note": "string",
//   "sum": 0,
//   "finalSumUsn": 0,
//   "priceTools": 0,
//   "priceWork": 0,
//   "discountByProject": 0,
//   "sumWithDiscount": 0,
//   "received": 0,
//   "remainder": 0,
//   "tools": [
//     0
//   ],
//   "workingShifts": [
//     {
//       "dateShift": "2024-11-25",
//       "typeShift": "DAY"
//     }
//   ]
// }
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

  const {projectsTypesList, projectStatusesList} = useSelector(state => state.projects);
  const {contacts} = useSelector(state => state.contacts);

  const [formData, setFormData] = useState({
    number: 0,
    classification: projectsTypesList[0].value,
    status: '',
    name: '',
    typeLease: '',
    quantity: 0,
    // employeeId: 0,
    contactId: 0,
    start: new Date().toISOString().split('T')[0],
    end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
    remainder: 0,
    photos: [],
    tools: [],
    workingShifts: []
  });
  const [showShifts, setShowShifts] = useState(false);
  const [workingDays, setWorkingDays] = useState(generateDateRange(formData.start, formData.end));

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = changeValueTypeToIntIfRequired(name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    setWorkingDays(generateDateRange(formData.start, formData.end));
  }, [formData.start, formData.end]);

  useEffect(() => {
    
    console.log(formData);
      
  }, [formData]);
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
                name="contactId"
                value={formData.contactId}
                onChange={handleInputChange}
                required
                className={styles.input}
              >
                {contacts.map(contact => <option value={contact.id}>{contact.name}</option>)}
              </select>
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
              <span className={styles.inputLabel}>Дата начала</span>
              <input 
                type="date" 
                name="start" 
                id="start" 
                value={formData.start} 
                onChange={handleInputChange} 
                className={styles.input} 
                max={new Date(new Date(formData.end).getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              />
            </div>

            <div className={styles.inputWrapper}> 
              <span className={styles.inputLabel}>Дата окончания</span>
              <input 
                type="date" 
                name="end" 
                id="end" 
                value={formData.end} 
                onChange={handleInputChange} 
                className={styles.input}
                min={new Date(new Date(formData.start).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              />
            </div>

            {/* <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Сотрудник</span>
              <input
                type="number"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div> */}

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
