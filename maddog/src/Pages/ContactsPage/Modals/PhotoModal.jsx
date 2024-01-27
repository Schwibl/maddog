import React from 'react';

import styles from './../ContactsPage.module.scss';


const PhotoModal = ({ url }) => {
  return (
    <div className={styles.modal}>
      <img src={url} alt='' />
    </div>
  );
};

export default PhotoModal;
