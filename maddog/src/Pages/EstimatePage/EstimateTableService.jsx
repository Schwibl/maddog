import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../components/button/Button';
import { updateServiceTotal } from '../../redux/features/estimateSlice';

import styles from './EstimateTable.module.scss';

export default function EstimateTableService() {
  const items = ['Механик', 'Фокуспуллер', 'Мех-фокус', 'Переработка', 'Камерваген', 'Такси', 'Парковка', 'Прогон за МКАД'];

  const dispatch = useDispatch();

  const [rows, setRows] = useState([
    {
      id: 1,
      cost: '',
      quantity: '',
      days: '',
    },
  ]);

  // Функция для добавления нового ряда
  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      cost: '',
      quantity: '',
      days: '',
      total: 0,
    };

    setRows([...rows, newRow]);
  };

  // Функция для удаления ряда по id
  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);

    setRows(updatedRows);
  };

  // Функция обработки изменения значения поля в ряду
  const handleFieldChange = (event, id, field) => {
    const value = parseInt(event.target.value);
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: !isNaN(value) ? value : '' };
        updatedRow.total = calculateTotal(updatedRow.cost, updatedRow.quantity, updatedRow.days);
        return updatedRow;
      }
      return row;
    });

    setRows(updatedRows);

    // Вызов редюсера для обновления итоговой стоимости сервиса
    const serviceTotal = updatedRows.reduce((total, row) => total + row.total, 0);
    dispatch(updateServiceTotal(serviceTotal));
  };

  // Функция для вычисления общей стоимости оборудования
  const calculateTotal = (cost, quantity, days) => {
    return Math.ceil(cost * quantity * days);
  };

  return (
    <tbody>
      <tr>
        <td className={styles.button}>
          <Button className={styles.addService} type='button' value='add-service' name='add-service' children='+' onClick={handleAddRow} />
        </td>
        <th colSpan={7}>Обслуживание и транспорт</th>
      </tr>
      {rows.map((row) => {
        const { id, cost, quantity, days, total } = row;

        return (
          <tr key={id}>
            <td>
              <Button className={styles.deleteService} type='button' value='delete-service' name='delete-service' children='-' onClick={() => handleDeleteRow(id)} />
            </td>
            <td>
              <select className={styles.selectService} name='service'>
                <option value=''>Выберите тип обслуживания</option>
                {items.map((item) => (
                  <option value={item} key={item} className={styles.optionService}>
                    {item}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input type='text' name='cost' value={cost} onChange={(e) => handleFieldChange(e, id, 'cost')} className={styles.input} placeholder='Цена за смену' />
            </td>
            <td>
              <input type='text' name='quantity' value={quantity} onChange={(e) => handleFieldChange(e, id, 'quantity')} className={styles.input} placeholder='Количество' />
            </td>
            <td>
              <input type='text' name='days' value={days} onChange={(e) =>handleFieldChange(e, id, 'days')} className={styles.input} placeholder='Количество'/>
            </td>
            <td>-</td>
            <td>{total}</td>
            <td>-</td>
          </tr>
        );
      })}
      <tr>
        <td colSpan={8} className={styles.emptyRow}></td>
      </tr>
    </tbody>
  );
}
