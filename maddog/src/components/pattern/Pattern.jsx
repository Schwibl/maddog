import { useState, useEffect, useMemo } from 'react';
import RepairFormModal from '../../Pages/RepairPage/RepairFormModal';
import styles from './Pattern.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEquipment } from '../../actions/equipmentApi';
import { setListPage, setSelectedEquipment } from '../../redux/features/equipmentSlice';
import SectionPattern from './SectionPattern';
import { openModalEquipment } from '../../redux/features/modalsSlice';

function applyFilter(equipmentList, filterState) {
  
}

function EquipmentPattern() { 
  const dispatch = useDispatch();

  const { equipmentList, selectedEquipment, statusesList, estimateSections, listPage } = useSelector(state => state.equipment);

  const [loading, setLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filterState, setFilterState] = useState({
    search: '',
    status: ''
  });

  useEffect(() => { 
    dispatch(getAllEquipment());
  }, []); 

  useEffect(() => {
    dispatch(getAllEquipment());
  }, [listPage]);

  if (loading) { 
    return <div>Загрузка...</div>; 
  } 

  if (equipmentList.length === 0) { 
    return <div>Нет данных для отображения.</div>; 
  } 

  return ( 
    <div className={styles.patternContainer}>
      <h1 className={styles.heading}>Оборудование</h1>
      <div className={styles.filterContainer}>
        {/* <input type="text" placeholder="Поиск" value={filterState.search} onChange={(e) => setFilterState({ ...filterState, search: e.target.value })} /> */}
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Меню</th>
              <th>Название</th>
              <th>Штрихкод</th>
              <th>Серийный номер</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {equipmentList.map(section => (
              <tr key={section.id}>
                <td>{section.menu}</td>
                <td>
                  <span onClick={() => {
                    dispatch(setSelectedEquipment(section));
                    dispatch(openModalEquipment());
                  }}>{section.name}</span> 
                </td>
                <td>{section.barcode}</td>
                <td>{section.serialNumber}</td>
                <td>{section.status}</td>
                <td>
                  {/* <button onClick={() => openRepairModal(section)}>Ремонт</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginator}>
        {
          listPage.page > 0 && (
            <button type="button" 
              onClick={() => {
                if (listPage.page > 0) {
                  dispatch(setListPage({ ...listPage, page: listPage.page - 1 }));
                }
              }}
            >
              Предыдущая
            </button>
          )
        }
        <span className={styles.pageNumber}>Страница {listPage.page + 1} из {listPage.totalPages}</span>
        {
          listPage.page < listPage.totalPages - 1 && (
            <button type="button" 
              onClick={() => {
                dispatch(setListPage({ ...listPage, page: listPage.page + 1 }));
              }}
            >
              Следующая
            </button>
          )
        }
      </div>
      {/* {selectedImage && (
        <div className={styles.modal} onClick={handleImageClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={handleImageClose}>&times;</span>
            <img src={selectedImage} alt="Просмотр фото" className={styles.modalImage} />
          </div>
        </div>
      )} */}
      {/* <RepairFormModal
        isOpen={isModalOpen}
        equipmentList={sections}
        onClose={handleCloseModal}
        onSave={handleRepairSave} // Передаем функцию сохранения
      /> */}
    </div>
  );
}

export default EquipmentPattern;
