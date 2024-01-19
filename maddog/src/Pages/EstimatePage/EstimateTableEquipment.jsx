import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/button/Button';
import {
  updateEquipmentCost,
  updateEquipmentQuantity,
  updateEquipmentDays,
  updateEquipmentDiscount,
  updateEquipmentTotalWithDiscount,
  updateTotalEquipmentPerShift,
} from '../../redux/features/estimateSlice';

import styles from './EstimateTable.module.scss';

export default function EstimateTableEquipment() {
  const dispatch = useDispatch();
  const cost = useSelector((state) => state.estimate.equipmentCost);
  const quantity = useSelector((state) => state.estimate.equipmentQuantity);
  const days = useSelector((state) => state.estimate.equipmentDays);
  const discount = useSelector((state) => state.estimate.equipmentDiscount);
  const quantityShift = useSelector((state) => state.estimate.quantityShift); 

  const [showFilters, setShowFilters] = useState(false);

  // Функция для вычисления общей стоимости обслуживания и стоимости с учетом скидки
  const calculateTotal = () => {
    const total = Math.ceil(cost * quantity * days);
    const totalWithDiscount = Math.ceil(total * (1 - discount / 100));
    return {
      total,
      totalWithDiscount
    };
  };

  const price = calculateTotal();

  // Функция для обработки изменения значения в поле ввода
  const handleChange = (event, setter) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      dispatch(setter(value));
    } else {
      dispatch(setter(''));
    }
  };

  // Функция для переключения фильтров, инвертирует значение переменной showFilters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Считаем стоимость оборудования в смену
  useEffect(() => {
    let totalPerShift = 0;

    if (quantityShift > 0) {
      const price = calculateTotal();
      totalPerShift = Math.ceil(price.totalWithDiscount / quantityShift);
    }

    dispatch(updateEquipmentTotalWithDiscount(price.totalWithDiscount));
    dispatch(updateTotalEquipmentPerShift(totalPerShift));
  }, [cost, quantity, days, discount, quantityShift]);

  return (
    <tbody>
      <tr>
        <th rowSpan={2} colSpan={2}>Наименование оборудования</th>
        <th rowSpan={2}>Стоимость</th>
        <th colSpan={3}>Количество</th>
        <th rowSpan={2}>Итого за смену</th>
        <th rowSpan={2}>Итого за смену с учетом скидки</th>
      </tr>
      <tr>
        <th>Ед.техники</th>
        <th>Дней</th>
        <th>Скидка</th>
      </tr>
      <tr>
        <th colSpan={8}>Оборудование</th>
      </tr>
      <tr>
        <td colSpan={2}>Микрофон
          <br />
          <Button className={styles.secure} onClick={toggleFilters} type='button' value='secure' name='secure' children='Закрепить оборудование'/>
          {showFilters && (
            <div>
              <Button className={styles.category} type='button' value='category' name='category' children='Из соответствующей категории'/>
              <Button className={styles.category} type='button' value='all' name='all' children='Из всего оборудования'/>
            </div>
          )}
        </td>
        <td><input type='text' name='cost' value={cost} onChange={(e) => handleChange(e, updateEquipmentCost)} className={styles.input} placeholder='Стоимость'/></td>
        <td><input type='text' name='quantity' value={quantity} onChange={(e) => handleChange(e, updateEquipmentQuantity)} className={styles.input} placeholder='Количество'/></td>
        <td><input type='text' name='days' value={days} onChange={(e) => handleChange(e, updateEquipmentDays)} className={styles.input} placeholder='Количество'/></td>
        <td><input type='text' name='discount' value={discount} onChange={(e) => handleChange(e, updateEquipmentDiscount)} className={styles.input} placeholder='Скидка'/></td>
        <td>{price.total}</td>
        <td>{price.totalWithDiscount}</td>
      </tr>
      <tr>
        <td colSpan={8} className={styles.emptyRow}></td>
      </tr>
    </tbody>
  );
}
