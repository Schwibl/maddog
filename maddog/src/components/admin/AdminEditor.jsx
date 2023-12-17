import { useState } from 'react';
import styles from './AdminEditor.module.scss';

export default function AdminEditor (props) {
    const {id, login, name, role, contact, handleClick } = props;
    // На старте делаем админа, который пришёл из пропсов, стартовым состоянием. 
    // Из него уже заполняем поля и меняем значения полей админа
    const [newName, setNewName] = useState(name || '');
    const [newLogin, setNewLogin] = useState(login || '');
    const [newContact, setNewContact] = useState(contact || '');
    const [newRole, setNewRole] = useState(role || '');
    const [newPassword, setNewPassword] = useState('');

    function handleName (e) {
        setNewName( e.target.value );
    }
    function handleLogin (e) {
        setNewLogin( e.target.value );
    }
    function handleContact (e) {
        setNewLogin( e.target.value );
    }
    function handlePassword (e) {
        setNewPassword( e.target.value );
    }
    function handleRole (e) {
        setNewRole( e.target.value );
    }

    function handleSaveAnmin (e) {
        //!Добавить функционал - изменение в стейт-менеджере админов и отправка изменений на бек
        e.preventDefault();
        handleClick(false);
    }

    return (
        <form>
            <fieldset className={styles.wrap}>
                <input className={styles.input} placeholder='Имя' name='name' type='text' autoFocus value={newName || ''} onChange={handleName} />
                <input className={styles.input} placeholder='Логин' name='login' type='text' value={newLogin || ''} onChange={handleLogin} />
                <input className={styles.input} placeholder='Телефон' name='contact' type='tel' value={newContact || ''} onChange={handleContact} />
                <input className={styles.input} placeholder='Пароль' name='password' type='password' value={newPassword || ''} onChange={handlePassword} />
                <label className={styles.selectWrap}>
                    <p>Выбрать новую роль</p>
                    <select className={styles.select} value={newRole} onChange={handleRole}>
                        <option value='' disabled>Текущая роль: {newRole}</option>
                        <option value='ADMIN'>ADMIN</option>
                        <option value='MANAGER'>MANAGER</option>
                        <option value='WORKER'>WORKER</option>
                    </select>
                </label>
                    <button className={styles.saveAdminBtn} type='submit' onClick={handleSaveAnmin}>Сохранить</button>
            </fieldset>
        </form>
    )
}