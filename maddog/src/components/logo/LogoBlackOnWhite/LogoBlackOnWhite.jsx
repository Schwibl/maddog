import {
    Link
} from 'react-router-dom';

import styles from './LogoBlackOnWhite.module.scss';

export default function LogoBlackOnWhite (props) {
    return (
        <Link href="/projects" className={styles.link}>
            <div className={styles.imgWrap}>
                <img className={styles.img} />
            </div>
        </Link>
    )
}