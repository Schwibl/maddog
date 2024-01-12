import { Link } from 'react-router-dom';


import styles from './404.module.scss';

export const NotFound = () => {
  return (
    <div className='content-container'>
      <h1 className={styles.title}>Not Found</h1>
      <Link to='/' className={styles.link}>
        Come back
      </Link>
    </div>
  );
};
