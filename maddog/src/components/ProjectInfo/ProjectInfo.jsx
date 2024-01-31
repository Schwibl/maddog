import { blueGrey } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React, { useState, useId } from 'react';

import getDates from '../../utils/getDates';
import Button from '../button/Button';
import Icon from '../Icon/Icon';
import SwitchShifts from '../SwitchShifts/SwitchShifts';

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
  const darkColor = blueGrey[900];
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

  // Клиент
  const [clientName, setClientName] = useState('');
  function handleClientName(e) {
    setClientName(e.target.value);
  }

  // Примечание
  const [note, setNote] = useState('');
  function handleNote(e) {
    setNote(e.target.value);
  }

  // Ссылки
  const [links, setLinks] = useState('');
  function handleLinks(e) {
    setLinks(e.target.value);
  }

  // Календари
  const [startData, setStartData] = useState(null);
  const [endData, setEndData] = useState(null);
  const [projectCreatedData, setProjectCreatedData] = useState(dayjs(new Date()));
  const [shifts, setShifts] = useState([]);

  // Смены
  // Если не заполнена дата начала или конца, дни равны пустому массиву.
  // Если обе даты заполнены, дни считаем дни в промежутке от первого до последнего.
  const days = startData === null || endData === null ? null : getDates(startData, endData);

  // Собственно, смены
  console.log(shifts);

  return (
    <div className={styles.wrap}>
      <div className={styles.mainInfo}>
        <TextField
          sx={{ minWidth: '25%' }}
          id='name'
          value={projectName}
          onChange={handleProjectName}
          label='Название проекта'
          variant='outlined'
        />
        <FormControl sx={{ minWidth: '25%' }}>
          <InputLabel id='typeLease'>Тип аренды</InputLabel>
          <Select
            labelId='typeLease'
            value={typeLease}
            label='Тип аренды'
            onChange={(e) => handleTypeLease(e)}
          >
            {typesLease.map((type) => (
              <MenuItem value={type} key={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: '25%' }}>
          <InputLabel id='classLease'>Разновидность аренды</InputLabel>
          <Select
            labelId='classLease'
            value={classLease}
            label='Разновидность аренды'
            onChange={(e) => handleClassLease(e)}
          >
            {classesLease.map((type) => (
              <MenuItem value={type} key={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={styles.clientWrap}>
        {/* Здесь имя клиента */}
        <div className={styles.client}>
          <FormControl sx={{ minWidth: '100%', backgroundColor: '#fcfcfd', borderRadius: '4px' }}>
            <InputLabel id='clientName'>Выберите клиента</InputLabel>
            <Select
              labelId='clientName'
              value={clientName}
              label='Выберите клиента'
              onChange={(e) => handleClientName(e)}
            >
              {clientsNames.map((client) => (
                <MenuItem value={client} key={client}>{client}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button className={styles.btnAddClient} title={'Добавить клиента'}>
            <Icon iconId='addPlus' />{' '}
          </Button>
        </div>
        {/* Здесь примечание и ссылки */}
        <TextField
          sx={{ width: '25%', backgroundColor: '#fcfcfd', borderRadius: '4px' }}
          id='note'
          value={note}
          onChange={handleNote}
          label='Примечания по проекту'
          variant='outlined'
        />
        <TextField
          sx={{ width: '25%', backgroundColor: '#fcfcfd', borderRadius: '4px' }}
          id='links'
          value={links}
          onChange={handleLinks}
          label='Ссылки - через запятую'
          variant='outlined'
        />
      </div>

      <div className={styles.datasWrap}>
        <DatePicker
          sx={{ borderRadius: '4px' }}
          label='Начало срока аренды'
          className={styles.dataPicker}
          value={startData}
          onChange={(newValue) => setStartData(newValue)}
        />
        <DatePicker
          sx={{ borderRadius: '4px' }}
          label='Окончание срока аренды'
          className={styles.dataPicker}
          value={endData}
          onChange={(newValue) => setEndData(newValue)}
        />
        <DatePicker
          sx={{ borderRadius: '4px' }}
          label='Создан'
          className={styles.dataPicker}
          value={projectCreatedData}
          onChange={(newValue) => setProjectCreatedData(newValue)}
        />
      </div>
      {days && (
        <section className={styles.shiftsWrap}>
          <h2 className={styles.subtitle}>Смены</h2>
          <div className={styles.shifts}>
            {days.map((day) => (
              <SwitchShifts
                day={day}
                key={day}
                shifts={shifts}
                setShifts={setShifts}
              ></SwitchShifts>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
