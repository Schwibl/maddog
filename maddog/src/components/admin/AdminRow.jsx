import styles from './AdminRow.module.scss';

import AdminEditor from './AdminEditor';
import { useState } from 'react';
import Icon from '../Icon/Icon';

export default function AdminRow (props) {
    const { login, name, role, id } = props;
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <div className={styles.wrap}>
                <p className={styles.text}>{login}</p>
                <p className={styles.text}>{name}</p>
                <p className={styles.text}>{role}</p>
                <button className={styles.btn} onClick={() => setIsEdit(!isEdit)}>
                    {/* <EditIcon /> */}
                    <Icon iconId='edit'/>
                    </button>
                <button className={styles.btn}>
                    {/* <DeleteIcon /> */}
                    <Icon iconId='delete'/>
                    </button>
            </div>
            {!isEdit || <AdminEditor id={id} login={login} name={name} role={role} handleClick={setIsEdit}/>}
        </>
    )
}