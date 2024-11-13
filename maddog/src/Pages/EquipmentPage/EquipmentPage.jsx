import React, { useState, useEffect } from 'react';
import EquipmentPattern from '../../components/pattern/Pattern';
import { useDispatch, useSelector } from 'react-redux';
import SectionPattern from '../../components/pattern/SectionPattern';
import { createPortal } from 'react-dom';
import PhotoModal from '../ContactsPage/Modals/PhotoModal';
import EquipmentModal from '../../components/pattern/EquipmentModal';


export default function EquipmentPage() {
  const dispatch = useDispatch();
  const { equipmentList, selectedEquipment } = useSelector(state => state.equipment);
  const isShowModalEquipment = useSelector(state => state.modals.modalEquipment);
  // const modalUrl = selectedEquipment?.photo;

  return (
    <div>
      <h1>Оборудование</h1>
      {/* {isShowPhotoModal && createPortal(<PhotoModal url={modalUrl} />, document.body)} */}
      {/* {isShowModalEquipment && createPortal(<EquipmentModal section={selectedEquipment} />, document.body)} */}
      <EquipmentPattern equipmentList={equipmentList} />  {/* Отображаем оборудование */}

    </div>
  );
}
