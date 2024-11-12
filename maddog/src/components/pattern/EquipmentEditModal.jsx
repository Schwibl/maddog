import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/features/modalsSlice';
import styles from './Pattern.module.scss';
import { updateEquipmentOrStatusById } from '../../actions/equipmentApi';

const EquipmentEditModal = ({ equipment, setShowEditModal }) => {
  const dispatch = useDispatch();

  // Form state
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [characteristics, setCharacteristics] = useState('');
  const [equip, setEquip] = useState('');
  const [amount, setAmount] = useState(0);
  const [state, setState] = useState('');
  const [costPrice, setCostPrice] = useState(0);
  const [priceByDay, setPriceByDay] = useState(0);
  const [priceSell, setPriceSell] = useState(0);
  const [priceSublease, setPriceSublease] = useState(0);
  const [paymentSublease, setPaymentSublease] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);
  const formData = {
    name,
    barcode,
    model,
    serialNumber,
    characteristics,
    amount,
    state,
    costPrice,
    priceByDay,
    priceSell,
    priceSublease,
    paymentSublease,
    comment,
    photos,
  };

  // Refs for validation
  const nameInput = useRef(null);
  const barcodeInput = useRef(null);
  const photoInput = useRef(null);
  const photoLabel = useRef(null);

  const [formValid, setFormValid] = useState(true);

  const checkFormValid = () => {
    const valid = name && barcode;
    if (valid) {
      setFormValid(true);
    } else {
      setFormValid(false);
      !name ? nameInput.current.classList.add(styles.invalid) : nameInput.current.classList.remove(styles.invalid);
      !barcode ? barcodeInput.current.classList.add(styles.invalid) : barcodeInput.current.classList.remove(styles.invalid);
    }
    return valid;
  };

  const handlePhotoChange = () => {
    const files = Array.from(photoInput.current.files);
    
    const readAndEncodeFiles = async () => {
      const encodedFiles = await Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );
      setPhotos(encodedFiles);
    };

    readAndEncodeFiles();
  };

  useEffect(() => {
    if (equipment) {
      setName(equipment.name || '');
      setBarcode(equipment.barcode || '');
      setModel(equipment.model || '');
      setSerialNumber(equipment.serialNumber || '');
      setCharacteristics(equipment.characteristics || '');
      setEquip(equipment.equip || '');
      setAmount(equipment.amount || 0);
      setState(equipment.state || '');
      setCostPrice(equipment.costPrice || 0);
      setPriceByDay(equipment.priceByDay || 0);
      setPriceSell(equipment.priceSell || 0);
      setPriceSublease(equipment.priceSublease || 0);
      setPaymentSublease(equipment.paymentSublease || 0);
      setComment(equipment.comment || '');
      setPhotos(equipment.photos || []);
    }
  }, [equipment]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.containerModal}>
          <h2 className={styles.titleModal}>Редактировать оборудование</h2>
          {equipment ? (
            <>
              <form>
                <div className={styles.inputBlock}>
                  <div className={styles.inputWrapper}>
                    <span>Название</span>
                    <input 
                      className={styles.input} 
                      type='text' 
                      placeholder='Название' 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      ref={nameInput} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Штрихкод</span>
                    <input 
                      className={styles.input} 
                      type='text' 
                      placeholder='Штрихкод' 
                      value={barcode} 
                      onChange={(e) => setBarcode(e.target.value)} 
                      ref={barcodeInput} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Модель</span>
                    <input 
                      className={styles.input} 
                      type='text' 
                      placeholder='Модель' 
                      value={model} 
                      onChange={(e) => setModel(e.target.value)} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Серийный номер</span>
                    <input 
                      className={styles.input} 
                      type='text' 
                      placeholder='Серийный номер' 
                      value={serialNumber} 
                      onChange={(e) => setSerialNumber(e.target.value)} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Характеристики</span>
                    <input 
                      className={styles.input} 
                      type='text' 
                      placeholder='Характеристики' 
                      value={characteristics} 
                      onChange={(e) => setCharacteristics(e.target.value)} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Количество</span>
                    <input 
                      className={styles.input} 
                      type='number' 
                      placeholder='Количество' 
                      value={amount} 
                      onChange={(e) => setAmount(Number(e.target.value))} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Состояние</span>
                    <input 
                      className={styles.input} 
                      type='text' 
                      placeholder='Состояние' 
                      value={state} 
                      onChange={(e) => setState(e.target.value)} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Стоимость</span>
                    <input 
                      className={styles.input} 
                      type='number' 
                      placeholder='Стоимость' 
                      value={costPrice} 
                      onChange={(e) => setCostPrice(Number(e.target.value))} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Цена за день</span>
                    <input 
                      className={styles.input} 
                      type='number' 
                      placeholder='Цена за день' 
                      value={priceByDay} 
                      onChange={(e) => setPriceByDay(Number(e.target.value))} 
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Фотографии</span>
                    <label className={styles.input} ref={photoLabel}>
                      <span className={styles.inputLabel}>Выбрать фото ({photos ? photos.length : 0}/5)</span>
                      <input 
                        className={styles.hiddenInput} 
                        type='file' 
                        accept="image/*"
                        multiple
                        onChange={handlePhotoChange}
                        ref={photoInput}
                      />
                    </label>
                  </div>
                  <div className={styles.inputWrapper}>
                    <span>Комментарий</span>
                    <input 
                      className={styles.input} 
                      type='text' 
                      placeholder='Комментарий' 
                      value={comment} 
                      onChange={(e) => setComment(e.target.value)} 
                    />
                  </div>
                </div>
              </form>
              <div className={styles.buttonBlock}>
                <button 
                  type='button'
                  className={styles.button}
                  onClick={() => {
                    if (checkFormValid()) {
                      // Here you would dispatch your update action
                      // dispatch(updateEquipment({ ...formData }));
                      dispatch(updateEquipmentOrStatusById({ id: equipment.id, updateData: formData }));
                      setShowEditModal(false);
                    }
                  }}
                >
                  Сохранить
                </button>
                <button
                  type='button'
                  className={styles.button}
                  onClick={() => {
                    setShowEditModal(false);
                  }}
                >
                  Отменить
                </button>
              </div>
            </>
          ) : (
            <span>Загрузка...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentEditModal;
