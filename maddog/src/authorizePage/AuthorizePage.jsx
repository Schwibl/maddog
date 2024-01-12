import React, { useContext } from 'react';
import {
  Link
} from 'react-router-dom';

import UserContext from '../context/UserContext';

import logo from './logoBlackOnTransparent.png';


import styles from './AuthorizePage.module.scss';

function AuthorizePage() {
  const user = useContext(UserContext);
  console.log('Данные пользователя:', user.id, user.role, user.contacts);

  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <Link to='/' className={styles.dogWrap}>
          <img src={logo} alt='MadDog Rental Logo' className={styles.img} />
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
            <Link to='/admin'>
              <button className={styles.submit} name='submit' type='submit' value='ВХОД'>ВХОД</button>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AuthorizePage;