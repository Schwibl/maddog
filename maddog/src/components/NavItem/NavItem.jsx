
import {
  Link
} from 'react-router-dom';

import styles from './NavItem.module.scss';

export default function NavItem ({text, href, children}) {

  return (
    <Link className={styles.wrap} to={href}>
      <div className={styles.imgWrap}>
        {children}
      </div>
      <p className={styles.text}>{text}</p>
    </Link>
  );
}