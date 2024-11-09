import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import logo from './logoBlackOnTransparent.png';
import styles from './AuthorizePage.module.scss';
import { authorization } from '../../actions/authorization';
import { useDispatch, useSelector } from 'react-redux';


/**
 * @description Страница fавторизации
 *
 * @returns {JSX.Element}
 */


function handleUserName(e, setUserName) {
  setUserName(e.target.value);
}
function handleUserPassword(e, setUserPassword) {
  setUserPassword(e.target.value);
}
function authorize({ name: userName, password: userPassword }, dispatch) {
  dispatch(authorization({ name: userName, password: userPassword },));
}


function AuthorizePage() {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //Инпуты
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // Если данные хотя бы один раз введут неправильно, инпуты подсветятся красным
  const [isValidData, setIsValidData] = useState(true);

  // Получение данных из Redux
  const session = useSelector((state) => state.session);


  // Cама функция авторизации
  // async function authorize() {
  //   const authorizedUser = await authorization(
  //     userName,
  //     userPassword,
  //     setAuthCode
  //   );
  //   if (authorizedUser) {
  //     setUser(authorizedUser);
  //     setIsValidData(true);
  //     navigate('projects', { replace: false });
  //   } else if (!authorizedUser) {
  //     console.log('Ты не пройдешь');
  //     setIsValidData(false);
  //     setUserName('');
  //     setUserPassword('');
  //     setTimeout(() => setIsValidData(true), 2000);
  //   }
  // }

  const inputsClass = classNames({
    [styles.input]: true,
    [styles.inputRejected]: !isValidData,
  });

  useEffect(() => {
    if (session.id) {
      navigate('/projects', { replace: false });
    }
  }, [session.id]);

  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <Link to='/' className={styles.dogWrap}>
          <img src={logo} alt='MadDog Rental Logo' className={styles.img} />
        </Link>
        <div className={styles.formSide}>
          <form className={styles.form}>
            <h1 className={styles.enter}>ВХОД В СИСТЕМУ</h1>
            <div className={styles.inputs}>
              <div className={styles.inputWrap}>
                <input
                  className={inputsClass}
                  type='text'
                  name='username'
                  value={userName}
                  onChange={(e) => {
                    handleUserName(e, setUserName);
                  }}
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
                  onChange={(e) => {
                    handleUserPassword(e, setUserPassword);
                  }}
                  placeholder='Введите свой пароль...'
                  autoComplete='on'
                />
              </div>
            </div>
            <div
              className={styles.submit}
              onClick={(e) => {
                e.preventDefault();
                authorize({ name: userName, password: userPassword }, dispatch);
              }}
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
