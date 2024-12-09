import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import Icon from '../Icon/Icon';
import LogoBlackOnTransparent from '../logo/LogoBlackOnTransparent/LogoBlackOnTransparent';
import NavItem from '../NavItem/NavItem';

import styles from './NavBar.module.scss';

export default function NavBar(props) {
  // const { role } = useContext(AuthContext); // Получаем роль пользователя из контекста
  // console.log('User role:', role); // Добавьте это для проверки

  return (
    <div className={styles.navigation}>
      <div className={styles.container}>
        <LogoBlackOnTransparent />
        <div className={styles.items}>
          <NavItem text={'Проекты'} href={'/projects'}>
            <img src='/images/project.svg' alt='Проекты' />
          </NavItem>
          <NavItem text={'Календарь'}>
            <img src='/images/calendar.svg' alt='Календарь' />
          </NavItem>
          <NavItem text={'Оборудование'} href={'/equipment'}>
            <img src='/images/equipment.svg' alt='Оборудование' />
          </NavItem>
          <NavItem text={'Контакты'} href={'/contacts'}>
            <img src='/images/contacts.svg' alt='Контакты' />
          </NavItem>
          <NavItem text={'Ремонт'} href={'/repair'}>
            <img src='/images/repair.svg' alt='Ремонт' />
          </NavItem>
          <NavItem text={'Расходы'}>
            <img src='/images/cost.svg' alt='Расходы' />
          </NavItem>
          <NavItem text={'Продажа'}>
            <img src='/images/sell.svg' alt='Продажа' />
          </NavItem>
          <NavItem text={'Панель администратора'} href={'/admin'}>
            <img src='/images/admin.svg' alt='Админка' />
          </NavItem>
        </div>
        <Link to='/' className={styles.admExit}>
          <div className={styles.imgWrap}>
            <img src='/images/logout.svg' alt='Выход' />
          </div>
        </Link>
      </div>
    </div>
  );
}
