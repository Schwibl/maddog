import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import RepairFormModal from './RepairFormModal';
import styles from './Repair.module.scss';

function Repair() {
  const [repairData, setRepairData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepairs, setSelectedRepairs] = useState([]); // Храним выбранные строки
  const [equipmentList, setEquipmentList] = useState([]); 

  const statusOptions = ['В ремонте', 'Завершен'];

  useEffect(() => {
    // Загрузка данных ремонта
    const mockRepairData = [
      // Пример данных
      {
        id: 1,
        equipmentName: 'Инструмент 1',
        startDate: '2024-09-01',
        endDate: '2024-09-10',
        phone: '123-456-789',
        responsiblePerson: 'Иван Иванов',
        cost: '5000',
        status: 'В ремонте',
      },
    ];
    setRepairData(mockRepairData);
    setLoading(false);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateRepair = (repairInfo) => {
    //const equipmentNames = selectedEquipment.join(', '); // Собираем выбранные элементы в строку
    const newRepairEntry = {
      id: Date.now(), // Уникальный идентификатор
      equipmentName: repairInfo.equipment, // Используем выбранное оборудование
      ...repairInfo, // Включаем данные из формы, включая 'responsiblePerson'
      status: 'В ремонте', // Статус по умолчанию
    };

    // Обновляем состояние repairData с новым ремонтом
    setRepairData((prevRepairs) => [newRepairEntry, ...prevRepairs]);
    handleCloseModal();
  };

  const handleStatusChange = (id, newStatus) => {
    setRepairData((prevRepairData) =>
      prevRepairData.map((repair) =>
        repair.id === id ? { ...repair, status: newStatus } : repair
      )
    );
  };

  const completedRepairs = repairData.filter(
    (repair) => repair.status === 'Завершен'
  );

  const handleRepairSelect = (id) => {
    setSelectedRepairs((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((repairId) => repairId !== id)
        : [...prevSelected, id]
    );
  };

  const handleReturnToStock = () => {
    setRepairData((prevRepairData) =>
      prevRepairData.map((repair) =>
        selectedRepairs.includes(repair.id)
          ? { ...repair, status: 'В ожидании' }
          : repair
      )
    );
    setSelectedRepairs([]); // Очищаем выбор после обновления
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1 className={styles.headingRepair}>Ремонт оборудования</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleOpenModal} className={styles.createButton}>
          Создать
        </button>
        <button onClick={handleReturnToStock} className={styles.returnButton}>
          Вернуть на склад
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Наименование оборудования</th>
              <th>Статус</th>
              <th>Начало ремонта</th>
              <th>Окончание ремонта</th>
              <th>Телефон</th>
              <th>Ответственный</th>
              <th>Стоимость</th>
              <th>Примечание</th>
              <th>Фотографии</th>
            </tr>
          </thead>
          <tbody>
            {repairData.map((repair) => (
              <tr key={repair.id}>
                <td>{repair.equipmentName}</td>
                <td>
                  <select
                    value={repair.status}
                    onChange={(e) =>
                      handleStatusChange(repair.id, e.target.value)
                    }
                    className={styles.statusSelect}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{dayjs(repair.startDate).format('DD-MM-YYYY')}</td> {/* Форматирование даты */}
                <td>{dayjs(repair.endDate).format('DD-MM-YYYY')}</td>   {/* Форматирование даты */}
                <td>{repair.phone}</td>
                <td>{repair.responsiblePerson}</td>
                <td>{repair.cost}</td>
                <td>{repair.note}</td>
                <td>{repair.photo ? <img src={repair.photos} alt="Фото" className={styles.photo} /> : 'Нет фото'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={styles.headingStoryRepair}>История завершенных ремонтов</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Наименование оборудования</th>
              <th>Статус</th>
              <th>Начало ремонта</th>
              <th>Окончание ремонта</th>
              <th>Телефон</th>
              <th>Ответственный</th>
              <th>Стоимость</th>
              <th>Примечание</th>
              <th>Фотографии</th>
            </tr>
          </thead>
          <tbody>
            {completedRepairs.map((repair) => (
              <tr key={repair.id}>
                <td>{repair.equipmentName}</td>
                <td>{repair.status}</td>
                <td>{repair.startDate}</td>
                <td>{repair.endDate}</td>
                <td>{repair.phone}</td>
                <td>{repair.responsiblePerson}</td>
                <td>{repair.cost}</td>
                <td>{repair.note}</td>
                <td>{repair.photo ? <img src={repair.photos} alt="Фото" className={styles.photo} /> : 'Нет фото'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модальное окно */}
      <RepairFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleCreateRepair}
        equipmentList={equipmentList}
      />
    </div>
  );
}

export default Repair;
