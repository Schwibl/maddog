import ProjectMenuDropdown from './ProjectMenuDropdown';
import styles from './ProjectPage.module.scss';

function ProjectRow(props) {
  const {
    name,
    status,
    client,
    phoneNumber,
    start,
    end,
    created,
    employee,
    note,
    classification,
    onEditProject
  } = props;

  const formatDate = (dateString, includeTime = false) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...(includeTime && {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    return date.toLocaleString('ru-RU', options);
  };

  return (
    <div className={styles.gridRow}>
      <div className={styles.gridCell}>
        <ProjectMenuDropdown project={props} onEditProject={onEditProject} />
      </div>
      <div className={styles.gridCell}>{name}</div>
      <div className={styles.gridCell}>{status}</div>
      <div className={styles.gridCell}>
        {client?.name}
        <div className={styles.moreInfoPopUp}>
          <p className={styles.moreInfoPopUp__heading}>Контакт: <span className={styles.moreInfoPopUp__value}>{client?.name}</span></p>
          <p className={styles.moreInfoPopUp__heading}>Телефон: <span className={styles.moreInfoPopUp__value}>{client?.phoneNumber}</span></p>
        </div>
      </div>
      <div className={styles.gridCell}>{phoneNumber}</div>
      <div className={styles.gridCell}>{formatDate(start)}</div>
      <div className={styles.gridCell}>{formatDate(end)}</div>
      <div className={styles.gridCell}>{formatDate(created, true)}</div>
      <div className={styles.gridCell}>{employee?.username}
        <div className={styles.moreInfoPopUp}>
          <p className={styles.moreInfoPopUp__heading}>Имя: <span className={styles.moreInfoPopUp__value}>{employee?.fullName}</span></p>
          <p className={styles.moreInfoPopUp__heading}>Телефон: <span className={styles.moreInfoPopUp__value}>{employee?.phoneNumber}</span></p>
        </div>
      </div>
      <div className={styles.gridCell}>{note}</div>
      <div className={styles.gridCell}>{classification}</div>
    </div>
  );
}

export default ProjectRow;