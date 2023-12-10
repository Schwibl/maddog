import React from 'react'
import styles from './CreateContactPage.module.scss';
import NavBar from '../../components/navbar/NavBar';


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
    )
}

export default CreateContactPage