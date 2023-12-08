import styles from './AdminRow.module.scss';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import AdminEditor from './AdminEditor';
import { useState } from 'react';

export default function AdminRow (props) {
    
    const { login, name, role, id } = props;
    const [isEdit, setIsEdit] = useState(false);
    console.log(isEdit);

    return (
        <>
            <div className={styles.wrap}>
                <p className={styles.text}>{login}</p>
                <p className={styles.text}>{name}</p>
                <p className={styles.text}>{role}</p>
                <button className={styles.btn} onClick={() => setIsEdit(!isEdit)}><EditIcon /></button>
                <button className={styles.btn}><DeleteIcon /></button>
            </div>
            {!isEdit || <AdminEditor id={id} login={login} name={name} role={role} setIsEdit={setIsEdit}/>}
        </>
    )
}