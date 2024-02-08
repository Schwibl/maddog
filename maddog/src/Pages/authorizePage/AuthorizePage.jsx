import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';


import { authorization } from '../../actions/authorization';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

import logo from './logoBlackOnTransparent.png';

/**
 * @description Страница fавторизации
 *
 * @returns {JSX.Element}
 */

import styles from './AuthorizePage.module.scss';

function AuthorizePage() {
  //Забираем значения пользователя из контекста
  const { user, setUser } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();

  // Делаем инпуты контролируемыми
  const [userName, setUserName] = useState('');
  function handleUserName(e) {
    setUserName(e.target.value);
  }

  const [userPassword, setUserPassword] = useState('');
  function handleUserPassword(e) {
    setUserPassword(e.target.value);
  }

  // Если данные хотя бы один раз введут неправильно, инпуты подсветятся красным
  const [isValidData, setIsValidData] = useState(true);

  // Cама функция авторизации
  async function authorize() {
    const authorizedUser = await authorization(userName, userPassword);

    if (authorizedUser) {
      setUser(authorizedUser);
      setIsValidData(true);
      navigate('projects', { replace: false });
    } else if (!authorizedUser) {
      console.log('Ты не пройдешь');
      setIsValidData(false);
    }
  }

  const inputsClass = classNames({
    [styles.input]: true,
    [styles.inputRejected]: !isValidData,
  });

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
                <input
                  className={inputsClass}
                  type='text'
                  name='username'
                  value={userName}
                  onChange={handleUserName}
                  placeholder='Можете ввести свой логин, телефон или почту...'
                  autoComplete='on'
                  autoFocus
                />
              </div>
              <div className={styles.inputWrap}>
                <input
                  className={inputsClass}
                  type='password'
                  name='password'
                  value={userPassword}
                  onChange={handleUserPassword}
                  placeholder='Введите свой пароль...'
                  autoComplete='on'
                />
              </div>
            </div>
            <div
              className={styles.submit}
              onClick={authorize}
              name='submit'
              type='submit'
              value='ВХОД'
            >
              ВХОД
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AuthorizePage;
