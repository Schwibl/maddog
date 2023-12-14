import styles from './EstimateTable.module.scss';
import logo from './logoInEstimateTable.png';
import Select from '../../components/Select/Select';

export default function EstimateTableHead() {
    const items = ['Клиент', 'Менеджер'];

    return (
        <thead>
            <tr>
                <td rowSpan={7} className={styles.tdLogo}>
                    <img className={styles.img} src={logo} alt='MadDog Rental Logo' />
                </td>
                <th rowSpan={2} colSpan={2} className={styles.head}>Съемочный период:</th>
                <td colSpan={5}>02-10-2023</td>
            </tr>
            <tr>
                <td colSpan={5}>19-10-2023</td>
            </tr>
            <tr>
                <th colSpan={2} className={styles.head}>Количество смен:</th>
                <td colSpan={5}>
                    <input type='text' defaultValue={1} />
                </td>
            </tr>
            <tr>
                <th colSpan={2} className={styles.head}>Проект:</th>
                <td colSpan={5}>Название</td>
            </tr>
            <tr>
                <th colSpan={2} className={styles.head}>Оператор:</th>
                <td colSpan={5}>
                    <Select items={items} placeholder='Выберите оператора' name='operator'/>
                </td>
            </tr>
            <tr>
                <th colSpan={2} className={styles.head}>Заказчик:</th>
                <td colSpan={5}>Иванов Сергей</td>
            </tr>
            <tr>
                <th colSpan={2} className={styles.head}>Менеджер:</th>
                <td colSpan={2} className={styles.textLeft}>Petrov Ivan</td>
                <td colSpan={2} className={styles.textLeft}>+79887555454</td>
                <td className={styles.link}>
                    <a href='https://maddogrental.pro/'>https://maddogrental.pro/</a>
                </td>
            </tr>
            <tr colSpan={7}><br /></tr>
        </thead>
    );
}
