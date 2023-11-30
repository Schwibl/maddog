import React, { useContext } from 'react';
import UserContext from '../UserContext';
import logo from './panel-logo2x.webp';
import styles from './AuthorizePage.module.scss';
import {
    Link
} from 'react-router-dom';

<<<<<<< HEAD
function AuthorizePage(props) {
=======
function AuthorizePage() {
    const user = useContext(UserContext);
    console.log('Данные пользователя:', user.id, user.role, user.contacts);
>>>>>>> a0fe0544ffb96e7f6ab6357bdf706d76876a2503
    return (
    <section className={styles.login}>
        <div className={styles.container}>
            <Link to='/projects'>
                <img src={logo} className={styles.img} />
            </Link>
            <div className={styles.formSide}>
                <form className={styles.form}>
                    <h1 className={styles.enter}>ВХОД В СИСТЕМУ</h1>
                    <div className={styles.input}>
                        <div className={styles.inputWrap}>
                            <input className={styles.input} type='text' name='username' placeholder='Можете ввести свой логин, телефон или почту...' autoComplete='on' />
                        </div>
                        <div className={styles.inputWrap}>
                            <input className={styles.input} type='password' name='password' placeholder='Введите свой пароль...' autoComplete='on' />
                        </div>
                    </div>
                    <Link to='/projects'>
                        <button className={styles.submit} name='submit' type='submit' value='ВХОД'>ВХОД</button>
                    </Link>
                </form>
            </div>
        </div>
        </section>
    );
}

export default AuthorizePage;