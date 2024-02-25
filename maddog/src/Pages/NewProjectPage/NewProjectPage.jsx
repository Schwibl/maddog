// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';
// import { AgGridReact } from 'ag-grid-react';
import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react';
// import { createPortal } from 'react-dom';

import { useNavigate } from 'react-router';

import { authorization } from '../../actions/authorization';
import mock from '../../components/pattern/mock';
import Pattern from '../../components/pattern/Pattern';
import ProjectInfo from '../../components/ProjectInfo/ProjectInfo';
// import Button from '../../components/button/Button';
// import Icon from '../../components/Icon/Icon';
// import { AG_GRID_LOCALE_RU } from '../../utils/ag-grid-locale-ru';

import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

import styles from './NewProjectPage.module.scss';

// eslint-disable-next-line import/order
import 'ag-grid-community/styles/ag-grid.css';

/**
 * @description Страница проекта
 *
 * @returns {JSX.Element}
 */

const NewProjectPage = () => {
  // Проверка на пользователя. Если не авторизован пользователь, ведем на экран авторизации
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  console.log(mock.sections);

  useEffect(() => {
    authorization();
  });

  return (
    <LocalizationProvider
      locale='es'
      dateAdapter={AdapterDayjs}
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <main className={styles.main}>
        <h1 className={styles.title}>Новый проект</h1>
        <section className={styles.projectInfo}>
          <ProjectInfo></ProjectInfo>
          <div className={styles.table}>
            <Pattern sections={mock.sections}></Pattern>
          </div>
        </section>
      </main>
    </LocalizationProvider>
  );
};

export default NewProjectPage;
