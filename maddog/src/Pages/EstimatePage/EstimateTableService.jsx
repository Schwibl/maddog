import { useState } from 'react';

import Button from '../../components/button/Button';

import styles from './EstimateTable.module.scss';

export default function EstimateTableService() {
  const items = ['Механик', 'Такси', 'Фокуспуллер'];

  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [days, setDays] = useState('');

  const calculateTotal = () => {
    return Math.ceil(cost * quantity * days);
  };

  const price = calculateTotal();

  const handleCostChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setCost(value);
    } else {
      setCost('');
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    } else {
      setQuantity('');
    }
  };

  const handleDaysChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setDays(value);
    } else {
      setDays('');
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <Button className={styles.addService} type='button' value='add-service' name='add-service' children='+'/>
        </td>
        <th colSpan={7}>Обслуживание и транспорт</th>
      </tr>
      <tr>
        <td>
          <Button className={styles.deleteService} type='button' value='delete-service' name='delete-service' children='-'/>
        </td>
        <td>
          <select className={styles.selectService} name='service'>
            <option value=''>Выберите тип обслуживания</option>
            {items.map((item) => (
              <option value={item} key={item} className={styles.optionService}>{item}</option>
            ))}
          </select>
        </td>
        <td><input type='text' name='cost' value={cost} onChange={handleCostChange} className={styles.input} placeholder='Цена за смену'/></td>
        <td><input type='text' name='quantity' value={quantity} onChange={handleQuantityChange} className={styles.input} placeholder='Количество'/></td>
        <td><input type='text' name='days' value={days} onChange={handleDaysChange} className={styles.input} placeholder='Количество'/></td>
        <td>-</td>
        <td>{price}</td>
        <td>-</td>
      </tr>
      <tr colSpan={7}><br /></tr>
    </tbody>
  );
}
