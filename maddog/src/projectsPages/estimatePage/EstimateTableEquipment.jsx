import { useState } from 'react';

export default function EstimateTableEquipment() {
    const [cost, setCost] = useState(11);
    const [quantity, setQuantity] = useState(1);
    const [days, setDays] = useState(1);
    const [discount, setDiscount] = useState(0);

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

    return (
        <tbody>
            <tr>
                <th rowSpan={2}>Наименование оборудования</th>
                <th rowSpan={2} colSpan={2}>Стоимость</th>
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
                <td>Микрофон</td>
                <td colSpan={2}><input type='text' name='cost' value={cost} onChange={handleCostChange} placeholder='Стоимость'/></td>
                <td><input type='text' name='quantity' value={quantity} onChange={handleQuantityChange} placeholder='Количество'/></td>
                <td><input type='text' name='days' value={days} onChange={handleDaysChange} placeholder='Количество'/></td>
                <td><input type='text' name='discount' value={discount} onChange={handleDiscountChange} placeholder='Скидка'/></td>
                <td>{price.total}</td>
                <td>{price.totalWithDiscount}</td>
            </tr>
        </tbody>
    );
}
