import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useEffect, useState } from 'react';

import ToolRow from './ToolRow';


import styles from './Pattern.module.scss';
import { closeModal, openPhotoModal } from '../../redux/features/modalsSlice';
import { useDispatch, useSelector } from 'react-redux';
import PhotoModal from '../../Pages/ContactsPage/Modals/PhotoModal';
import { createPortal } from 'react-dom';
import EquipmentPhotoModal from './EquipmentPhotoModal';

// id, name, barcode, model, amount, state, photos, tools = [], sections, setSections, description 
function EquipmentModal({ 
  section
}) {
  const dispatch = useDispatch();

  const [photoUrl, setPhotoUrl] = useState('');
  const [showPhoto, setShowPhoto] = useState(false);
  const { id, name, barcode, model, amount, state, photos, tools = [], sections, setSections, description, serialNumber, ownerId, paymentSublease, priceSublease, priceSell, priceByDay, repairAmount, incomeSales, incomeAdditional, incomeInvestor, incomeInvestorProcents, incomeFromTools, numberWorkingShifts, characteristics, costPrice } = section;


  // characteristics: "Фокальные расстояния:25,32,50,75,100мм"
  // costPrice: 1500000
  // creating: "2024-08-15"
  // equipment: "Комплект из 5 объективов"
  // estimateId: null
  // id: 55
  // incomeAdditional: 0
  // incomeFromTools: 0
  // incomeInvestor: 0
  // incomeInvestorProcents: 0
  // incomeSales: 0
  // model: "PL-mount"
  // name: "Cooke Anamorphic Set_"
  // numberWorkingShifts: 0
  // ownerId: 1
  // paymentSublease: 10
  // photos: []
  // priceByDay: 0
  // priceSell: 0
  // priceSublease: 10000
  // projectId: null
  // repairAmount: 0
  // section: null
  // serialNumber: "123123"
  // state: "бу"

  return (
    <div className={styles.equipmentModalOverlay} 
      onClick={(e)=>{
        if(!e.target.closest('.sectionWrap')) {
          if(showPhoto) {
            setShowPhoto(false);
          } else {
            e.stopPropagation();
            dispatch(closeModal());
          }
        }
      }}>
      <div className={[styles.sectionWrap, 'sectionWrap'].join(' ')} id={id}>
        <h2 className={styles.sectionName}>
          {name}
        </h2>
        <p>Описание: {description || 'Описание отсутствует'}</p>  {/* Отображение описания */}
        <p>Модель: {model}</p>
        <p>Штрихкод: {barcode}</p>
        <p>Количество: {amount}</p>
        <p>Состояние: {state}</p>
        <p>Серийный номер: {serialNumber}</p>
        <p>Владелец: {ownerId}</p>
        <p>Подрядчик: {paymentSublease}</p>
        <p>Цена подряда: {priceSublease}</p>
        <p>Цена продажи: {priceSell}</p>
        <p>Цена за день: {priceByDay}</p>
        <p>Сумма ремонта: {repairAmount}</p>
        <p>Доход от продаж: {incomeSales}</p>
        <p>Доход от дополнительных услуг: {incomeAdditional}</p>
        <p>Доход от инвесторов: {incomeInvestor}</p>
        <p>Доход от инвесторов в процентах: {incomeInvestorProcents}</p>
        <p>Доход от инструментов: {incomeFromTools}</p>
        <p>Количество рабочих смен: {numberWorkingShifts}</p>
        <p>Характеристики: {characteristics}</p>
        <p>Стоимость приобретения: {costPrice}</p>
        <div className={styles.photos}>
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <img key={index} src={photo} alt={`${name} фото`} className={styles.photo} onClick={() => {
                setPhotoUrl(photo);
                setShowPhoto(true);
              }}/>
            ))
          ) : (
            <p>Фото не добавлено</p>
          )}
        </div>
        {tools.length > 0 && (
          <>
            <div className={styles.sectionHeader}>
              <p className={styles.headerDelete}>Удалить</p>
              <p>Название</p>
              <p>Количество</p>
            </div>
            <div className={styles.toolsWrap}>
              {tools.map((tool) => (
                <ToolRow
                  key={tool.id}
                  sectionName={name}
                  tool={tool}
                  sections={sections}
                  setSections={setSections}
                />
              ))}
            </div>
          </>
        )}

        {/* <div className={styles.addToolWrap}>
          <button className={styles.addTool}><AddIcon /> Добавить оборудование</button>
        </div> */}
      </div>
      {showPhoto && photoUrl && <EquipmentPhotoModal photoUrl={photoUrl} />}
    </div>
  );
}

export default EquipmentModal;
