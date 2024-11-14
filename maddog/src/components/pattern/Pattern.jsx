import { useState, useEffect, useMemo } from 'react';
import RepairFormModal from '../../Pages/RepairPage/RepairFormModal';
import styles from './Pattern.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEquipment, getAllEquipmentTypes, getAllTypesOfStatuses, getEquipmentWithFilter } from '../../actions/equipmentApi';
import { setListPage, setSelectedEquipment } from '../../redux/features/equipmentSlice';
import SectionPattern from './SectionPattern';
import { openModalEquipment } from '../../redux/features/modalsSlice';
import EquipmentMenuDropdown from './EquipmentMenuDropdown';
import EquipmentEditModal from './EquipmentEditModal';
import EquipmentCreateModal from './EquipmentCreateModal';

function handleStatusClick(status, selectedStatuses, setSelectedStatuses) {
  if (selectedStatuses.includes(status)) {  
    setSelectedStatuses(selectedStatuses.filter(s => s !== status));
  } else {
    setSelectedStatuses([...selectedStatuses, status]);
  }
}

function EquipmentPattern() { 
  const dispatch = useDispatch();

  const { equipmentList, selectedEquipment, statusesList, estimateSections, listPage } = useSelector(state => state.equipment);

  const [loading, setLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  useEffect(() => { 
    dispatch(getAllEquipment());
    dispatch(getAllTypesOfStatuses());
    dispatch(getAllEquipmentTypes());
  }, []); 

  useEffect(() => {
    dispatch(getAllEquipment());
  }, [listPage]);

  useEffect(() => {
    if (selectedStatuses.length > 0) {
      dispatch(getEquipmentWithFilter({ activeFilters: { statusesTools: selectedStatuses }, page: 0, size: listPage.size }));
    } else {
      dispatch(getAllEquipment());
    }
  }, [selectedStatuses]);

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
        <div className={styles.dropdown}>
          <div className={styles.dropdown__head} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>Статус</div>
          {showStatusDropdown && (
            <div className={styles.dropdown__body}>
              <div className={styles.dropdown__item} onClick={() => setSelectedStatuses([])}>
                <span>Все</span>
              </div>
              {statusesList.map(status => (
                <div className={styles.dropdown__item + ' ' + (selectedStatuses.includes(status) ? styles.dropdown__item_active : '') } onClick={() => handleStatusClick(status, selectedStatuses, setSelectedStatuses)}>
                  <span>{status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="button" className={styles.button} onClick={() => setShowCreateModal(true)}>Создать оборудование</button>
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
                <td>
                  <EquipmentMenuDropdown equipmentId={section.id} setShowEditModal={setShowEditModal} />
                </td>
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
                  if(selectedStatuses.length > 0) { 
                    dispatch(getEquipmentWithFilter({ activeFilters: { statusesTools: selectedStatuses }, page: listPage.page - 1, size: listPage.size }));
                  } else {
                    dispatch(setListPage({ ...listPage, page: listPage.page - 1 }));
                  }
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
                if(selectedStatuses.length > 0) {
                  dispatch(getEquipmentWithFilter({ activeFilters: { statusesTools: selectedStatuses }, page: listPage.page + 1, size: listPage.size }));
                } else {
                  dispatch(setListPage({ ...listPage, page: listPage.page + 1 }));
                }
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
      {showEditModal && <EquipmentEditModal equipment={selectedEquipment} setShowEditModal={setShowEditModal} />}
      {showCreateModal && <EquipmentCreateModal setShowCreateModal={setShowCreateModal} />}
    </div>
  );
}

export default EquipmentPattern;
