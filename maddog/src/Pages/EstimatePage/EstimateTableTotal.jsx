import { useDispatch, useSelector } from 'react-redux';

import { updateTotalDiscount, updateTotalTax } from '../../redux/features/estimateSlice';

import styles from './EstimateTable.module.scss';

export default function EstimateTableTotal() {
  const dispatch = useDispatch();
  const discount = useSelector((state) => state.estimate.totalDiscount);
  const tax = useSelector((state) => state.estimate.totalTax);
  const totalEquipmentPerShift = useSelector((state) => state.estimate.totalEquipmentPerShift);
  const totalServise = useSelector((state) => state.estimate.serviceTotal);

  // Функция для обработки изменения значения в поле ввода
  const handleChange = (event, setter) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      dispatch(setter(value));
    } else {
      dispatch(setter(''));
    }
  };

  return (
    <tbody>
      <tr>
        <td rowSpan={4} colSpan={4}>
          Итоговая стоимость оборудования
        </td>
        <td colSpan={3} className={styles.textLeft}>В смену {totalEquipmentPerShift}</td>
        <td rowSpan={4}></td>
      </tr>
      <tr>
        <td colSpan={3} className={styles.textLeft}>
          Скидка % <input type='text' name='discount' value={discount} onChange={(e) => handleChange(e, updateTotalDiscount)} className={styles.inputTotal} placeholder='Скидка %'/>
        </td>
      </tr>
      <tr>
        <td colSpan={3} className={styles.textLeft}>С учетом скидки</td>
      </tr>
      <tr>
        <td colSpan={3} className={styles.textLeft}>За проект</td>
      </tr>
      <tr>
        <td rowSpan={2} colSpan={4}>
          Итоговая стоимость обслуживания
        </td>
        <td colSpan={3} className={styles.textLeft}>В смену</td>
        <td rowSpan={2}></td>
      </tr>
      <tr>
        <td colSpan={3} className={styles.textLeft}>За проект {totalServise}</td>
      </tr>
      <tr>
        <td rowSpan={3} colSpan={4}>
          Общая стоимость
        </td>
        <td colSpan={3} className={styles.textLeft}>За проект</td>
        <td rowSpan={3}></td>
      </tr>
      <tr>
        <td colSpan={3} className={styles.textLeft}>
          Процент УСН <input type='number' name='tax' value={tax} onChange={(e) => handleChange(e, updateTotalTax)} className={styles.inputTotal} placeholder='УСН %'/>
        </td>
      </tr>
      <tr>
        <td colSpan={3} className={styles.textLeft}>При оплате по УСН</td>
      </tr>
    </tbody>
  );
}
