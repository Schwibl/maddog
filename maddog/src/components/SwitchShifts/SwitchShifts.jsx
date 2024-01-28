import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';
import { AgGridReact } from 'ag-grid-react';
import React, { useState, useMemo, useCallback } from 'react';
import styles from './SwitchShifts.module.scss';

import dayjs from 'dayjs';

/**
 * @description Страница проекта
 *
 * @returns {JSX.Element}
 */

const SwitchShifts = (day, shiftsArray) => {

    return (
        <div className={styles.wrap}>
            <div className={styles.shift}>

            </div>
            <p className={styles.shiftDay}>{dayjs(day).format('DD/MM/YYYY')}</p>
        </div>
    );
};

export default SwitchShifts;
