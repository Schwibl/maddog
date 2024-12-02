import { useDispatch, useSelector } from 'react-redux';
import {
  Link
} from 'react-router-dom';

import { setSelectedProject } from '../../redux/features/projectsSlice';

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
  const dispatch = useDispatch();
  const {selectedProject, projectsStatusesList, leaseTypesList} = useSelector(state => state.projects);

  const {
    projectHref,
    name,
    status,
    client,
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

  const statusText = projectsStatusesList.find(s => s.value === status)?.text || status;
  const typeLeaseText = leaseTypesList.find(t => t.value === typeLease)?.text || typeLease;

  return (
    <div className={styles.gridRow + (selectedProject?.id === props.id ? ' ' + styles.gridRow_selected : '')} 
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedProject(props));
      }}
    >
      <div className={styles.gridCell}>
        <Link to={projectHref}>{name}</Link>
      </div>
      <div className={styles.gridCell}>{statusText}</div>
      <div className={styles.gridCell}>
        {client.name}
        <div className={styles.moreInfoPopUp}>
          <div className={styles.moreInfoPopUp__row}>
            <div className={styles.moreInfoPopUp__heading}>
              Роль:
            </div>
            <div className={styles.moreInfoPopUp__value}>
              {client.roleContact}
            </div>
          </div>
          <div className={styles.moreInfoPopUp__row}>
            <div className={styles.moreInfoPopUp__heading}>
              Полное имя:
            </div>
            <div className={styles.moreInfoPopUp__value}>
              {client.fullName}
            </div>
          </div>
          <div className={styles.moreInfoPopUp__row}>
            <div className={styles.moreInfoPopUp__heading}>
              Телефон:
            </div>
            <div className={styles.moreInfoPopUp__value}>
              {client.phoneNumber}
            </div>
          </div>

          {client.company && (
            <div className={styles.moreInfoPopUp__row}>
              <div className={styles.moreInfoPopUp__heading}>
                Компания:
              </div>
              <div className={styles.moreInfoPopUp__value}>
                {client.company}
              </div>
            </div>
          )}
        </div>
      </div>
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
      <div className={styles.gridCell}>{typeLeaseText}</div>
      <div className={styles.gridCell}>
        <Link to={`/estimate/${estimateHref}`}>Смета</Link>
      </div>
    </div>
  );
}

export default ProjectRow;