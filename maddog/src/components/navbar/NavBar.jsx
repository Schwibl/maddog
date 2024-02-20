import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import Icon from '../Icon/Icon';
import LogoBlackOnTransparent from '../logo/LogoBlackOnTransparent/LogoBlackOnTransparent';
import NavItem from '../NavItem/NavItem';


import styles from './NavBar.module.scss';

export default function NavBar(props) {

  return (
    <div className={styles.navigation}>
      <div className={styles.container}>
        <LogoBlackOnTransparent />
        <div className={styles.items}>
          <NavItem text={'Проекты'} href={'/projects'}>
            <Icon iconId='projects'/> 
          </NavItem>
          <NavItem text={'Календарь'}>
            <Icon iconId='calendar' />
          </NavItem>
          <NavItem text={'Оборудование'}>
            <Icon iconId='tools' />
          </NavItem>
          <NavItem text={'Контакты'} href={'/contacts'}>
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
        </div>
        <Link to='/' className={styles.admExit}>
          <div className={styles.imgWrap}>
            <Icon iconId='admExit' />
          </div>
        </Link>
      </div>
    </div>
  );
}
