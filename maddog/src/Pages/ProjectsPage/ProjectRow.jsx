import {
  Link
} from 'react-router-dom';

import styles from './ProjectPage.module.scss';

export function turnIntoDate(date) {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    seconds: 'none',
  });
}


function ProjectRow(props) {
  const {
    projectHref,
    name,
    status,
    contact,
    phoneNumber,
    start,
    end,
    created,
    employee,
    note,
    typeLease,
    estimateHref
  } = props;

  const startDate = turnIntoDate(start);
  const endDate = turnIntoDate(end);
  const createdDate = turnIntoDate(created);

  return (
    <div className={styles.gridRow}>
      <div className={styles.gridCell}>
        <Link to={projectHref}>{name}</Link>
      </div>
      <div className={styles.gridCell}>{status}</div>
      <div className={styles.gridCell}>{contact}</div>
      <div className={styles.gridCell}>{phoneNumber}</div>
      <div className={styles.gridCell}>{startDate}</div>
      <div className={styles.gridCell}>{endDate}</div>
      <div className={styles.gridCell}>{createdDate}</div>
      <div className={styles.gridCell}>
        {employee.username}
        <div className={styles.moreInfoPopUp}>
          <div className={styles.moreInfoPopUp__row}>
            <div className={styles.moreInfoPopUp__heading}>
              Полное имя:
            </div>
            <div className={styles.moreInfoPopUp__value}>
              {employee.fullName}
            </div>
          </div>
          <div className={styles.moreInfoPopUp__row}>
            <div className={styles.moreInfoPopUp__heading}>
              Телефон:
            </div>
            <div className={styles.moreInfoPopUp__value}>
              {employee.phoneNumber}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gridCell}>{note}</div>
      <div className={styles.gridCell}>{typeLease}</div>
      <div className={styles.gridCell}>
        <Link to={`/estimate/${estimateHref}`}>Смета</Link>
      </div>
    </div>
  );
}

export default ProjectRow;