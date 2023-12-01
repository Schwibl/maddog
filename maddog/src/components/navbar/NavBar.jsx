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

export default function NavBar (props) {
    return (
        <div className={styles.navigation}>
            <div className={styles.container}>
                <LogoBlackOnTransparent />
                <div className={styles.items}>
                    <NavItem text={'Проекты'}>
                        <ProjectsSVG />
                    </NavItem>
                    <NavItem text={'Календарь'}>
                        <CalendarSVG />
                    </NavItem>
                    <NavItem text={'Оборудование'}>
                        <ToolsSVG />
                    </NavItem>
                    <NavItem svg={ContactsSVG} text={'Контакты'}>
                        <ContactsSVG />
                    </NavItem>
                    <NavItem text={'Ремонт'}>
                        <RepairSVG />
                    </NavItem>
                    <NavItem svg={WriteOffSVG} text={'Списание'}>
                        <WriteOffSVG />
                    </NavItem>
                    <NavItem text={'Продажа'}>
                        <SalesSVG />
                    </NavItem>
                    <NavItem text={'Панель администратора'}>
                        <AdminSVG />
                    </NavItem>
                </div>
            </div>
        </div>
    )
}