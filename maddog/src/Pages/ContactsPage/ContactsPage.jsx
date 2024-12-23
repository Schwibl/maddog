import { AgGridReact, gridRef } from 'ag-grid-react';
import React, { useState, useMemo, useCallback, useRef, memo, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { selectContact } from '../../redux/features/contactsSlice';
import { openModalCreateContact, openModalCreateContactRole, openModalDeleteContact, openModalEditContact } from '../../redux/features/modalsSlice';
import { AG_GRID_LOCALE_RU } from '../../utils/ag-grid-locale-ru';

import CheckboxFilter from './CheckBoxCustomFilter';
import DeleteContactModal from './Modals/DeleteContactModal';
import PhotoModal from './Modals/PhotoModal';

// eslint-disable-next-line import/order
import styles from './ContactsPage.module.scss';

// eslint-disable-next-line import/order
import 'ag-grid-community/styles/ag-grid.css';
import CreateContactModal from './Modals/CreateContactModal';
import { getAllContacts, getPossibleRoles } from '../../actions/contactsApi';
import { getCompanies } from '../../actions/companiesApi';
import EditContactModal from './Modals/EditContactModal';
import CreateContactRoleModal from './Modals/CreateContactRoleModal';

/**
 * @description Страница для отображения всех контактов
 *
 * @returns {JSX.Element}
 */

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const isEnabledButtons = useSelector((state) => state.contacts.isEnabled);
  const isShowDeleteModal = useSelector((state) => state.modals.modalDeleteContact);
  const isShowCreateContactModal = useSelector((state) => state.modals.modalCreateContact);
  const isShowEditContactModal = useSelector((state) => state.modals.modalEditContact);
  const isShowCreateContactRoleModal = useSelector((state) => state.modals.modalCreateContactRole);
  const possibleRoles = useSelector((state) => state.contacts.possibleRoles);
  const session = useSelector((state) => state.session);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [isShowPhotoModal, setIsShowPhotoModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    if (!session.id) {
      navigate('/');
    }
  }, [session.id]);

  const avatarFormatter = ({ value }) => {
    return (
      <img
        onMouseEnter={() => {
          setIsShowPhotoModal(true);
          setModalUrl(value);
        }}
        onMouseLeave={() => {
          setIsShowPhotoModal(false);
        }}
        src={value}
        alt=''
      />
    );
  };

  const gridOptions = {
    localeText: AG_GRID_LOCALE_RU,
  };

  const cellClickedListener = useCallback((e) => {
    // console.log(e);
    dispatch(selectContact(e.data));
    // console.log(gridRef.current.api.getSelectedNodes());
  });

  const gridRef = useRef();


  // const [rowData, setRowData] = useState(
  //   contacts.map(({ id, name, role, photoUrl }) => ({
  //     id,
  //     name,
  //     role: types.find((type) => type.id === role).role,
  //     photoUrl,
  //   }))
  // );

  const rowData = contacts.map(({ id, name, roleContact, photoUrl }) => ({
    id,
    name,
    role: roleContact,
    photoUrl,
  }));

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
          // console.log('Checked values:', checkedValues);
          const gridApi = gridRef.current.api;
          const filteredData = rowData.filter((row) =>
            checkedValues.includes('Все типы') ? row : checkedValues.includes(row.role)
          );
          gridApi.setRowData(filteredData);
          // gridApi.isFilterActive(true);
        },
        typesValues: ['Все типы', ...possibleRoles.map((item) => item.role)],
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
      cellRenderer: memo(avatarFormatter),
    },
  ];

  const getRowId = useCallback((params) => {
    return params.data.id;
  });

  const [columnDefs, setColumnDefs] = useState(tableHeader);

  // Проверка на пользователя. Если не авторизован пользователь, ведем на экран авторизации
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPossibleRoles());
    dispatch(getAllContacts({ page, size }));
    dispatch(getCompanies());
  }, []);

  return (
    <main className={styles.main}>
      {isShowPhotoModal && createPortal(<PhotoModal url={modalUrl} />, document.body)}
      {isShowDeleteModal && createPortal(<DeleteContactModal />, document.body)}
      {isShowCreateContactModal && createPortal(<CreateContactModal />, document.body)}
      {isShowEditContactModal && createPortal(<EditContactModal/>, document.body)}
      {isShowCreateContactRoleModal && createPortal(<CreateContactRoleModal />, document.body)}
      <section className={styles.contactsPage}>
        <h1 className={styles.title}>Контакты</h1>

        <div className={styles.agTable}>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              type='button'
              onClick={() => dispatch(openModalDeleteContact())}
              disabled={!isEnabledButtons}
            >
              Удалить контакт
            </button>
            <button className={styles.button} type='button' disabled={!isEnabledButtons} onClick={() => dispatch(openModalEditContact())}>
              Редактировать контакт
            </button>
            <button className={styles.button} type='button' onClick={() => dispatch(openModalCreateContact())}>
              Добавить контакт
            </button>
            <button className={styles.button} type='button' onClick={() => dispatch(openModalCreateContactRole())}>
              Добавить тип контакта
            </button>
          </div>
          <div className={styles['ag-table']}>
            <AgGridReact
              ref={gridRef}
              getRowId={getRowId}
              onCellClicked={cellClickedListener}
              rowData={rowData}
              defaultColDef={{ flex: 1 }}
              pagination={true}
              columnDefs={columnDefs}
              gridOptions={gridOptions}
              animateRows={true}
              rowSelection='single'
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactsPage;
