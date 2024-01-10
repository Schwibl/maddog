import {
  Link
} from 'react-router-dom';

import styles from './ProjectPage.module.scss';

function ProjectRow(props) {
  const {
    projectHref,
    projectName,
    status,
    contact,
    phone,
    startDate,
    endDate,
    createdDate,
    creator,
    note,
    type,
    estimateHref
  } = props;

  return (
    <div className={styles.gridRow}>
      <p className={styles.gridCell}>
        <Link to={projectHref}>{projectName}</Link>
      </p>
      <p className={styles.gridCell}>{status}</p>
      <p className={styles.gridCell}>{contact}</p>
      <p className={styles.gridCell}>{phone}</p>
      <p className={styles.gridCell}>{startDate}</p>
      <p className={styles.gridCell}>{endDate}</p>
      <p className={styles.gridCell}>{createdDate}</p>
      <p className={styles.gridCell}>{creator}</p>
      <p className={styles.gridCell}>{note}</p>
      <p className={styles.gridCell}>{type}</p>
      <p className={styles.gridCell}>
        <Link to={`/estimate/${estimateHref}`}>Смета</Link>
      </p>
    </div>
  );
}

export default ProjectRow;