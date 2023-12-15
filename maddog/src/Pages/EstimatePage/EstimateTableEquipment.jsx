import { useState } from 'react';
import styles from './EstimateTable.module.scss';
import Button from '../../components/button/Button';

export default function EstimateTableEquipment() {
    const [cost, setCost] = useState(11);
    const [quantity, setQuantity] = useState(1);
    const [days, setDays] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    const calculateTotal = () => {
        const total = Math.ceil(cost * quantity * days);
        const totalWithDiscount = Math.ceil(total * (1 - discount / 100));
        return {
            total,
            totalWithDiscount
        };
    };

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

    const handleDiscountChange = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setDiscount(value);
        } else {
            setDiscount('');
        }
    };

    const price = calculateTotal();

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
                <td><input type='text' name='cost' value={cost} onChange={handleCostChange} className={styles.input} placeholder='Стоимость'/></td>
                <td><input type='text' name='quantity' value={quantity} onChange={handleQuantityChange} className={styles.input} placeholder='Количество'/></td>
                <td><input type='text' name='days' value={days} onChange={handleDaysChange} className={styles.input} placeholder='Количество'/></td>
                <td><input type='text' name='discount' value={discount} onChange={handleDiscountChange} className={styles.input} placeholder='Скидка'/></td>
                <td>{price.total}</td>
                <td>{price.totalWithDiscount}</td>
            </tr>
            <tr colSpan={8}><br /></tr>
        </tbody>
    );
}
