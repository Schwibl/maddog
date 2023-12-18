
import { Link } from 'react-router-dom';

import styles from './ContactsPage.module.scss';

function ContactRow(props) {
  return (
    <div className={styles.gridRow}>
      <p className={styles.gridCell}>
        <input type='checkbox' />{props.id}
      </p>

      <p className={styles.gridCell}>
        <Link className={styles.link} to={`/contacts/edit/${props.id}`}>
          {props.name}
        </Link>
      </p>

      <p className={styles.gridCell}><img src={props.photoUrl} alt={`Изображение ${props.name}`} /></p>

    </div>
  );
}

export default ContactRow;