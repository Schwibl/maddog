import { useState } from 'react';

import styles from './EstimateTable.module.scss';

export default function EstimateTableTotal() {
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  const handleChange = (event, setter) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setter(value);
    } else {
      setter('');
    }
  };

  return (
    <tbody>
      <tr>
        <td rowSpan={4} colSpan={4}>
          Итоговая стоимость оборудования
        </td>
        <td colSpan={3}>В смену</td>
        <td rowSpan={4}></td>
      </tr>
      <tr>
        <td colSpan={3}>
            Скидка % <input type='text' name='discount' value={discount} onChange={(event) => {handleChange(event, setDiscount);}} className={styles.input} placeholder='Скидка %'/>
        </td>
      </tr>
      <tr>
        <td colSpan={3}>С учетом скидки</td>
      </tr>
      <tr>
        <td colSpan={3}>За проект</td>
      </tr>
      <tr>
        <td rowSpan={2} colSpan={4}>
          Итоговая стоимость обслуживания
        </td>
        <td colSpan={3}>В смену</td>
        <td rowSpan={2}></td>
      </tr>
      <tr>
        <td colSpan={3}>За проект</td>
      </tr>
      <tr>
        <td rowSpan={3} colSpan={4}>
          Общая стоимость
        </td>
        <td colSpan={3}>За проект</td>
        <td rowSpan={3}></td>
      </tr>
      <tr>
        <td colSpan={3}>
            Процент УСН <input type='number' name='tax' value={tax} onChange={(event) => {handleChange(event, setTax);}} className={styles.input} placeholder='УСН %'/>
        </td>
      </tr>
      <tr>
        <td colSpan={3}>При оплате по УСН</td>
      </tr>
    </tbody>
  );
}
