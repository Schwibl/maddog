import { useState } from 'react';

import Select from '../../components/Select/Select';

import logo from './logoInEstimateTable.png';

import styles from './EstimateTable.module.scss';

export default function EstimateTableHead() {
  const items = ['Клиент', 'Менеджер'];
  const [startDate, setStartDate] = useState('02-10-2023');
  const [endDate, setEndDate] = useState('19-10-2023');
  const [quantityShift, setQuantityShift] = useState('1');

  // Функция для обработки изменения значения в поле ввода
  const handleChange = (event, setter) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setter(value);
    } else {
      setter('');
    }
  };

  return (
    <thead>
      <tr>
        <td rowSpan={7} colSpan={2} className={styles.tdLogo}>
          <img className={styles.img} src={logo} alt='MadDog Rental Logo' />
        </td>
        <th rowSpan={2} className={styles.head}>Съемочный период:</th>
        <td colSpan={5}>
          <input type='text' className={styles.dateInput} value={startDate} onChange={(e) => handleChange(e, setStartDate)} placeholder='Начало аренды'/>
        </td>
      </tr>
      <tr>
        <td colSpan={5}>
          <input type='text' className={styles.dateInput} value={endDate} onChange={(e) => handleChange(e, setEndDate)} placeholder='Окончание аренды'/>
        </td>
      </tr>
      <tr>
        <th className={styles.head}>Количество смен:</th>
        <td colSpan={5}>
          <input type='text' className={styles.quantityShift} value={quantityShift} onChange={(e) => handleChange(e, setQuantityShift)} placeholder='Количество'/>
        </td>
      </tr>
      <tr>
        <th className={styles.head}>Проект:</th>
        <td colSpan={5}>Название</td>
      </tr>
      <tr>
        <th className={styles.head}>Оператор:</th>
        <td colSpan={5}>
          <Select items={items} placeholder='Выберите оператора' name='operator'/>
        </td>
      </tr>
      <tr>
        <th className={styles.head}>Заказчик:</th>
        <td colSpan={5}>Иванов Сергей</td>
      </tr>
      <tr>
        <th className={styles.head}>Менеджер:</th>
        <td colSpan={2} className={styles.textLeft}>Petrov Ivan</td>
        <td colSpan={2} className={styles.textLeft}>+79887555454</td>
        <td className={styles.link}>
          <a href='https://maddogrental.pro/'>maddogrental.pro</a>
        </td>
      </tr>
      <tr>
        <td colSpan={8} className={styles.emptyRow}></td>
      </tr>
    </thead>
  );
}
