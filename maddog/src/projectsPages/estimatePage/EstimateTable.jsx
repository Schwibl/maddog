import styles from './EstimateTable.module.scss'

export default function EstimateTable() {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <tr>
                    <td rowSpan={7}>Логотип</td>
                    <th rowSpan={2} colSpan={2}>Съемочный период:</th>
                    <td colSpan={4}>02-10-2023</td>
                </tr>
                <tr>
                    <td colSpan={4}>19-10-2023</td>
                </tr>
                <tr>
                    <th colSpan={3}>Количество смен:</th>
                    <td colspan={2}><input type="number" value={2}/></td>
                </tr>
                <tr>
                    <th>Проект:</th>
                    <td colSpan={5}>Название</td>
                </tr>
                <tr>
                    <th>Оператор:</th>
                    <td colSpan={5}>Оператор: 
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
                    <td><a href="https://maddogrental.pro/">https://maddogrental.pro/</a></td>
                </tr>
            </table>
        </div>
    )
}