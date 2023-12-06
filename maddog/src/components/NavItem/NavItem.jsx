import styles from './NavItem.module.scss';
import {
    Link
} from 'react-router-dom';

export default function NavItem (props) {

    const { text, href,  children } = props;
    return (
        <Link className={styles.wrap} to={href}>
            <div className={styles.imgWrap}>
                {children}
            </div>
            <p className={styles.text}>{text}</p>
        </Link>
    )
}