import React, { useState } from 'react';

import Button from '../button/Button';
import Icon from '../Icon/Icon';
import Select from '../Select/Select';

import styles from './ProjectInfo.module.scss';

/**
 * @description Секция с информацией о проекте
 *
 * @returns {JSX.Element}
 */

//Тестовые данные
const typesLease = ['Прямая', 'Субаренда'];
const classesLease = ['Разовый', 'Длинный', 'Субаренда', 'Тестовый'];
const clientsNames = ['Клиент1', 'Клиент2', 'Клиент3', 'Клиент4'];

export default function ProjectInfo(props) {
  // Название проекта
  const [projectName, setProjectName] = useState('');
  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };

  // Тип аренды
  const [typeLease, setTypeLease] = useState('');
  function handleTypeLease(e) {
    setTypeLease(e.target.value);
  }

  // Класс аренды
  const [classLease, setClassLease] = useState('');
  function handleClassLease(e) {
    setClassLease(e.target.value);
  }

  // Кллиент
  const [clientName, setClientName] = useState('');
  function handleClientName(e) {
    setClientName(e.target.value);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.mainInfo}>
        <label htmlFor='name'>
          <input
            className={styles.input}
            type='text'
            name='name'
            value={projectName}
            placeholder='Название проекта'
            onChange={handleProjectName}
          />
        </label>
        <Select
          name={'typeLease'}
          items={typesLease}
          placeholder={'Тип аренды'}
          value={typeLease}
          onChange={(e) => handleTypeLease(e)}
        ></Select>
        <Select
          name={'classLease'}
          items={classesLease}
          placeholder={'Разновидность аренды'}
          value={classLease}
          onChange={(e) => handleClassLease(e)}
        ></Select>
      </div>
      <div className={styles.clientWrap}>
        <Select
          name={'clientName'}
          className={styles.selectClientsName}
          items={clientsNames}
          placeholder={'Выберите клиента'}
          value={clientName}
          onChange={(e) => handleClientName(e)}
        />
        <Button className={styles.btnAddClient} title={'Добавить клиента'}>
          <Icon iconId='addPlus' />{' '}
        </Button>
      </div>
    </div>
  );
}
