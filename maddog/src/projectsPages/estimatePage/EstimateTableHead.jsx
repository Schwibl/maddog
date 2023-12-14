import styles from './EstimateTable.module.scss';
import logo from './logoInEstimateTable.png';

export default function EstimateTableHead() {
    return (
        <thead>
        <tr>
            <td rowSpan={7} className={styles.tdLogo}>
            <img className={styles.img} src={logo} alt='MadDog Rental Logo' />
            </td>
            <th rowSpan={2}>Съемочный период:</th>
            <td colSpan={4}>02-10-2023</td>
        </tr>
        <tr>
            <td colSpan={4}>19-10-2023</td>
        </tr>
        <tr>
            <th>Количество смен:</th>
            <td colSpan={3}>
            <input type='text' defaultValue={1} />
            </td>
        </tr>
        <tr>
            <th>Проект:</th>
            <td colSpan={5}>Название</td>
        </tr>
        <tr>
            <th>Оператор:</th>
            <td colSpan={5}>
            <select>
                <option>Выберите оператора</option>
                <option>Клиент</option>
                <option>Менеджер</option>
            </select>
            </td>
        </tr>
        <tr>
            <th>Заказчик:</th>
            <td colSpan={5}>Иванов Сергей</td>
        </tr>
        <tr>
            <th>Менеджер:</th>
            <td>Petrov Ivan</td>
            <td>+79887555454</td>
            <td>
            <a href='https://maddogrental.pro/'>https://maddogrental.pro/</a>
            </td>
        </tr>
        </thead>
    );
}
