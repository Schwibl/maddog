import { useState } from 'react';

import Button from '../../components/button/Button';

import styles from './EstimateTable.module.scss';

export default function EstimateTableEquipment() {
  const [cost, setCost] = useState(11);
  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(1);
  const [discount, setDiscount] = useState(0);
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
      setter(value);
    } else {
      setter('');
    }
  };

  // Функция для переключения фильтров, инвертирует значение переменной showFilters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

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
        <td><input type='text' name='cost' value={cost} onChange={(e) => handleChange(e, setCost)} className={styles.input} placeholder='Стоимость'/></td>
        <td><input type='text' name='quantity' value={quantity} onChange={(e) => handleChange(e, setQuantity)} className={styles.input} placeholder='Количество'/></td>
        <td><input type='text' name='days' value={days} onChange={(e) => handleChange(e, setDays)} className={styles.input} placeholder='Количество'/></td>
        <td><input type='text' name='discount' value={discount} onChange={(e) => handleChange(e, setDiscount)} className={styles.input} placeholder='Скидка'/></td>
        <td>{price.total}</td>
        <td>{price.totalWithDiscount}</td>
      </tr>
      <tr colSpan={8}><br /></tr>
    </tbody>
  );
}
