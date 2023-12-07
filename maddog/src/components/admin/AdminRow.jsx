import styles from './AdminRow.module.scss';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';

export default function AdminRow (props) {
    const { login, name, role } = props;

    return (
            <div className={styles.wrap}>
                <p className={styles.text}>{login}</p>
                <p className={styles.text}>{name}</p>
                <p className={styles.text}>{role}</p>
                <button className={styles.btn}><EditIcon /></button>
                <button className={styles.btn}><DeleteIcon /></button>
            </div>
    )
}