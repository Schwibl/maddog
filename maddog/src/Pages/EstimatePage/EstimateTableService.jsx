import { useState } from 'react';

import Button from '../../components/button/Button';

import styles from './EstimateTable.module.scss';

export default function EstimateTableService() {
  const items = ['Механик', 'Такси', 'Фокуспуллер'];

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
    };

    setRows([...rows, newRow]);
  };

  // Функция для удаления ряда по id
  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);

    setRows(updatedRows);
  };

  const handleCostChange = (event, id) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, cost: value };
        }
        return row;
      });

      setRows(updatedRows);
    } else {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, cost: '' };
        }
        return row;
      });

      setRows(updatedRows);
    }
  };

  const handleQuantityChange = (event, id) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, quantity: value };
        }
        return row;
      });

      setRows(updatedRows);
    } else {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, quantity: '' };
        }
        return row;
      });

      setRows(updatedRows);
    }
  };

  const handleDaysChange = (event, id) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, days: value };
        }
        return row;
      });

      setRows(updatedRows);
    } else {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, days: '' };
        }
        return row;
      });

      setRows(updatedRows);
    }
  };

  const calculateTotal = (cost, quantity, days) => {
    return Math.ceil(cost * quantity * days);
  };

  return (
    <tbody>
      <tr>
        <td>
          <Button className={styles.addService}
            type='button'
            value='add-service'
            name='add-service'
            children='+'
            onClick={handleAddRow}
          />
        </td>
        <th colSpan={7}>Обслуживание и транспорт</th>
      </tr>
      {rows.map((row) => {
        const { id, cost, quantity, days } = row;
        const price = calculateTotal(cost, quantity, days);

        return (
          <tr key={id}>
            <td>
              <Button
                className={styles.deleteService}
                type='button'
                value='delete-service'
                name='delete-service'
                children='-'
                onClick={() => handleDeleteRow(id)}
              />
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
              <input
                type='text'
                name='cost'
                value={cost}
                onChange={(event) => handleCostChange(event, id)}
                className={styles.input}
                placeholder='Цена за смену'
              />
            </td>
            <td>
              <input
                type='text'
                name='quantity'
                value={quantity}
                onChange={(event) => handleQuantityChange(event, id)}
                className={styles.input}
                placeholder='Количество'
              />
            </td>
            <td>
              <input
                type='text'
                name='days'
                value={days}
                onChange={(event) => handleDaysChange(event, id)}
                className={styles.input}
                placeholder='Количество'
              />
            </td>
            <td>-</td>
            <td>{price}</td>
            <td>-</td>
          </tr>
        );
      })}
      <tr colSpan={7}>
        <br />
      </tr>
    </tbody>
  );
}
