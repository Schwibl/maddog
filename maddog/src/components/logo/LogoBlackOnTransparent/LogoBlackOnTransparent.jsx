import {
  Link
} from 'react-router-dom';

import logo from './logoBlackOnTransparent.png';


import styles from './LogoBlackOnTransparent.module.scss';

export default function LogoBlackOnTransparent (props) {
  return (
    <Link href="/projects" className={styles.link}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={logo} alt='MadDog Rental Logo' />
      </div>
    </Link>
  );
}