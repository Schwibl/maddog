import React, { useContext } from 'react';
import styles from './NavBar.module.scss';
import LogoBlackOnTransparent from '../logo/LogoBlackOnTransparent/LogoBlackOnTransparent';
import NavItem from '../NavItem/NavItem';
import AdminSVG from './adminSVG';
import CalendarSVG from './calendarSVG';
import ContactsSVG from './contactsSVG';
import ProjectsSVG from './projectsSVG';
import RepairSVG from './repairSVG';
import SalesSVG from './salesSVG';
import ToolsSVG from './toolsSVG';
import WriteOffSVG from './writeOffSVG';
import AdmExitSVG from './admExitSVG';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';

export default function NavBar (props) {
    // Забираем из контекста данные текущего юзера
    const user = useContext(UserContext);
    const { role } = user;

    return (
        <div className={styles.navigation}>
            <div className={styles.container}>
                <LogoBlackOnTransparent />
                <div className={styles.items}>
                    <NavItem text={'Проекты'} href={'/projects'}>
                        <ProjectsSVG />
                    </NavItem>
                    <NavItem text={'Календарь'}>
                        <CalendarSVG />
                    </NavItem>
                    <NavItem text={'Оборудование'}>
                        <ToolsSVG />
                    </NavItem>
                    <NavItem text={'Контакты'}>
                        <ContactsSVG />
                    </NavItem>
                    <NavItem text={'Ремонт'}>
                        <RepairSVG />
                    </NavItem>
                    <NavItem text={'Списание'}>
                        <WriteOffSVG />
                    </NavItem>
                    <NavItem text={'Продажа'}>
                        <SalesSVG />
                    </NavItem>
                    <NavItem text={'Панель администратора'}>
                        <AdminSVG />
                    </NavItem>
                    <Link to='/' className={styles.admExit}>
                        <div className={styles.imgWrap}>
                            <AdmExitSVG />
                        </div>
                        <p className={styles.admName}>{role}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}