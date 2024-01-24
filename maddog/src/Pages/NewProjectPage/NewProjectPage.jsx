import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AgGridReact } from 'ag-grid-react';
import React, { useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';

import ProjectInfo from '../../components/ProjectInfo/ProjectInfo';
// import Button from '../../components/button/Button';
// import Icon from '../../components/Icon/Icon';
import { AG_GRID_LOCALE_RU } from '../../utils/ag-grid-locale-ru';

import styles from './NewProjectPage.module.scss';

// eslint-disable-next-line import/order
import 'ag-grid-community/styles/ag-grid.css';

/**
 * @description Страница проекта
 *
 * @returns {JSX.Element}
 */

const NewProjectPage = () => {
  //   const [typesList, setTypesList] = useState(types);

  //   const [columnDefs, setColumnDefs] = useState(tableHeader);

  //   const [rowData, setRowData] = useState(
  //     projects.map(({ name, barcode, group }) => ({
  //       name,
  //       role: types.find((type) => type.id === role).role,
  //       photoUrl,
  //     }))
  //   );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main className={styles.main}>
        <h1 className={styles.title}>Новый проект</h1>
        <section className={styles.projectInfo}>
          <ProjectInfo></ProjectInfo>
        </section>
      </main>
    </LocalizationProvider>
  );
};

export default NewProjectPage;
