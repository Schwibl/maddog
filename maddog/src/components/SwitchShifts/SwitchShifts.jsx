import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import React, { useState, useMemo, useCallback } from 'react';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

import Icon from './../Icon/Icon';

import styles from './SwitchShifts.module.scss';

/**
 * @description Страница проекта
 *
 * @returns {JSX.Element}
 */

const SwitchShifts = (props) => {
  const { day, shifts, setShifts } = props;

  const [dayShift, setDayShiht] = useState(false);
  const [nightShift, setNightShiht] = useState(false);

  const handleDayShift = () => {
    // Если смена была добавлена, мы ее удаляем из массива смен. Если её ее не добавили, то добавляем в массив смен
    if (!dayShift) {
      setShifts([
        ...shifts,
        {
          id: 0,
          dateShift: dayjs(day).locale('ru').format('YYYY-MM-DD'),
          typeShift: 'DAY',
        },
      ]);

      setDayShiht(!dayShift);
    } else if (dayShift) {
      const newShifts = shifts.map((shift) => {
        if(shift.typeShift === 'DAY') {
          if (shift. dateShift === dayjs(day).locale('ru').format('YYYY-MM-DD')) {
            return null;
          } else return shift;
        } else return shift;
      })
        .filter((newShift) => newShift !== null);

      setShifts(newShifts);
      setDayShiht(!dayShift);
    }
  };

  const handleNightShift = () => {
    // Если смена была добавлена, мы ее удаляем из массива смен. Если её ее не добавили, то добавляем в массив смен
    if (!nightShift) {
      setShifts([
        ...shifts,
        {
          id: 0,
          dateShift: dayjs(day).locale('ru').format('YYYY-MM-DD'),
          typeShift: 'NIGHT',
        },
      ]);
      setNightShiht(!nightShift);

    } else if (nightShift) {

      const newShifts = shifts.map((shift) => {
        if(shift.typeShift === 'NIGHT') {
          if (shift. dateShift === dayjs(day).locale('ru').format('YYYY-MM-DD')) {
            return null;
          } else return shift;
        } else return shift;
      })
        .filter((newShift) => newShift !== null);

      setShifts(newShifts);
      setNightShiht(!nightShift);
    }
  };

  // Структура смены
  // {
  //   "id": 0,
  //   "dateShift": "2024-01-28",
  //   "typeShift": "DAY",
  //   "project_id": 0
  // }

  return (
    <div className={styles.wrap}>
      <div className={styles.shift}>
        <div className={styles.btnsWrap}>
          <button
            className={dayShift ? styles.dayBtnActive : styles.dayBtnDisable}
            onClick={handleDayShift}
          >
            <LightModeIcon />
          </button>
          <button
            className={nightShift ? styles.nightBtnActive : styles.nightBtnDisable}
            onClick={handleNightShift}
          >
            <ModeNightIcon />
          </button>
        </div>
        <div className={styles.data}>{dayjs(day).locale('ru').format('DD MMM, dd')}</div>
      </div>
    </div>
  );
};

export default SwitchShifts;
