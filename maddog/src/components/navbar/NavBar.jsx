import LogoBlackOnWhite from "../logo/LogoBlackOnWhite/LogoBlackOnWhite"
import styles from './NavBar.module.scss';

export default function NavBar (props) {
    return (
        <div className={styles.navigation}>
            <div className={styles.container}>
                <LogoBlackOnWhite />
            </div>
        </div>
    )
}