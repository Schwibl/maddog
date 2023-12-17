import React from 'react';

import NavBar from '../../components/navbar/NavBar';

import styles from './CreateContactPage.module.scss';


/**
 * @description Страница создания нового контакта
 * 
 * @returns {JSX.Element} 
 */

const CreateContactPage = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <section className={styles.createContactPage}>
      </section>
    </main>
  );
};

export default CreateContactPage;