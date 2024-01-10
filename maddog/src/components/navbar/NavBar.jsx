import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../context/UserContext';
import LogoBlackOnTransparent from '../logo/LogoBlackOnTransparent/LogoBlackOnTransparent';
import NavItem from '../NavItem/NavItem';


import Icon from './../Icon/Icon';

import styles from './NavBar.module.scss';

export default function NavBar(props) {
  // Забираем из контекста данные текущего юзера
  const user = useContext(UserContext);
  const { name } = user;

  return (
    <div className={styles.navigation}>
      <div className={styles.container}>
        <LogoBlackOnTransparent />
        <div className={styles.items}>
          <NavItem text={'Проекты'} href={'/admin/projects'}>
            <Icon iconId='projects'/> 
          </NavItem>
          <NavItem text={'Календарь'}>
            <Icon iconId='calendar' />
          </NavItem>
          <NavItem text={'Оборудование'}>
            <Icon iconId='tools' />
          </NavItem>
          <NavItem text={'Контакты'} href={'/admin/contacts'}>
            <Icon iconId='contacts' />
          </NavItem>
          <NavItem text={'Ремонт'}>
            <Icon iconId='repair' />
          </NavItem>
          <NavItem text={'Списание'}>
            <Icon iconId='writeOff' />
          </NavItem>
          <NavItem text={'Продажа'}>
            <Icon iconId='sales' />
          </NavItem>
          <NavItem text={'Панель администратора'} href={'/admin'}>
            <Icon iconId='admin' />
          </NavItem>
          <Link to="/" className={styles.admExit}>
            <div className={styles.imgWrap}>
              <Icon iconId="admExit" />
            </div>
            <p className={styles.admName}>{name}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
