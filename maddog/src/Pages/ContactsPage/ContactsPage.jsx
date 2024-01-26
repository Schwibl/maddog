import { AgGridReact, gridRef } from 'ag-grid-react';
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '../../components/button/Button';
import Icon from '../../components/Icon/Icon';
import { AG_GRID_LOCALE_RU } from '../../utils/ag-grid-locale-ru';

import CheckboxFilter from './CheckBoxCustomFilter';
import { types, contacts } from './mock';

import styles from './ContactsPage.module.scss';

// eslint-disable-next-line import/order, import/no-unresolved
import 'ag-grid-community/styles/ag-grid.css';

/**
 * @description Страница для отображения всех контактов
 *
 * @returns {JSX.Element}
 */

const ContactsPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  const PhotoModal = ({ url }) => {
    return (
      <div className={styles.modal}>
        <img src={url} alt='' />
      </div>
    );
  };

  const avatarFormatter = ({ value }) => {
    return (
      <img
        onMouseEnter={() => {
          setIsShowModal(true);
          setModalUrl(value);
        }}
        onMouseLeave={() => {
          setIsShowModal(false);
        }}
        src={value}
        alt=''
      />
    );
  };

  const editFormatter = (p) => {
    return (
      <button
        type='button'
        className={styles.tableBtn}
        onClick={() => {
          window.alert('value= ', p.data.name);
          console.log(p.data.name);
        }}
      >
        <Icon iconId='edit' />
      </button>
    );
  };

  const RoleFilter = () => {
    return <p>hello</p>;
  };

  const gridOptions = {
    localeText: AG_GRID_LOCALE_RU,
  };

  const cellClickedListener = useCallback((e) => {
    console.log(e);
  });

  const gridRef = useRef();

  const [typesList, setTypesList] = useState(types);

  const [rowData, setRowData] = useState(
    contacts.map(({ name, role, photoUrl }) => ({
      name,
      role: types.find((type) => type.id === role).role,
      photoUrl,
    }))
  );

  const tableHeader = [
    {
      headerName: 'ФИО',
      field: 'name',
      flex: 6,
      resizable: true,
      sortable: true,
      // filter: true,
      floatingFilter: true,
      filter: 'agTextColumnFilter',
      cellClass: 'vertical-middle',
    },
    {
      headerName: 'Тип контакта',
      field: 'role',
      flex: 2,
      sortable: true,
      filter: CheckboxFilter,
      filterParams: {
        filterChangedCallback: (checkedValues) => {
          console.log('Checked values:', checkedValues);
          const gridApi = gridRef.current.api;
          const filteredData = rowData.filter((row) =>
            checkedValues.includes('Все типы') ? row : checkedValues.includes(row.role)
          );
          gridApi.setRowData(filteredData);
        },
        typesValues: ['Все типы', ...types.map((item) => item.role)],
      },
      cellClass: 'all-middle',
    },
    {
      headerName: 'Фото',
      field: 'photoUrl',
      sortable: false,
      flex: 1,
      filter: false,
      cellClass: 'vertical-middle',
      cellRenderer: avatarFormatter,
    },
  ];

  const [columnDefs, setColumnDefs] = useState(tableHeader);

  return (
    <main className={styles.main}>
      {isShowModal && createPortal(<PhotoModal url={modalUrl} />, document.body)}
      <section className={styles.contactsPage}>
        <h1 className={styles.title}>Контакты</h1>

        <div className={styles.agTable}>
          <div className={styles.buttons}>
            <button className={styles.button} type='button'>
              Удалить
            </button>
            <button className={styles.button} type='button'>
              Редактировать
            </button>
            <button className={styles.button} type='button'>
              Добавить тип контакта
            </button>
            <button className={styles.button} type='button'>
              Добавить контакт
            </button>
          </div>
          <div className={styles['ag-table']}>
            <AgGridReact
              ref={gridRef}
              onCellClicked={cellClickedListener}
              rowData={rowData}
              defaultColDef={{ flex: 1 }}
              pagination={true}
              columnDefs={columnDefs}
              gridOptions={gridOptions}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactsPage;
