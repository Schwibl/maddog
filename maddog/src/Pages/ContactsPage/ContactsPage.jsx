import React, { useState } from 'react'
import styles from './ContactsPage.module.scss';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import { types, tableHeader, contacts } from './mock';
import ContactRow from './ContactRow';

/**
 * @description Страница для отображения всех контактов
 * 
 * @returns {JSX.Element} 
 */

const ContactsPage = () => {
    const [filter, setFilter] = useState('');
    const [selectedType, setSelectedType] = useState();

    const handleFilterChange = (event) => {
        // обработчик ввода значений в поисковую строку
        setFilter(event.target.value);
    };

    const handleTypeChange = (event) => {
        // обработчик выбора типа контакта
        setSelectedType(event.target.selectedIndex);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    const filteredContacts = contacts
        .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
        .filter(({ role }) => selectedType ? role === selectedType : true);


    return (
        <main className={styles.main}>
            <NavBar />
            <section className={styles.contactsPage}>
                <div className={styles.filterBlock}>
                    <form className={styles.filterForm} onSubmit={handleSubmit}>
                        <Input type='text' placeholder='ФИО' name='name' onChange={handleFilterChange} />
                        <Select items={types} placeholder='Выберите тип контакта' onChange={handleTypeChange}
                        />
                        <Button className={styles.button} type='submit' >Найти</Button>
                    </form>
                    <Link to='/create' className={styles.createBtn}>
                        <Button className={styles.button} type='button' >
                            Создать
                        </Button>
                    </Link>
                </div>

                <div className={styles.table}>
                    <div className={styles.gridRowHeader}>
                        {tableHeader.map((item, idx) => (
                            <div className={styles.gridHeader} key={idx}>{item}</div>
                        ))}
                    </div>
                    {filteredContacts.map(({ id, name, photoUrl }) => ({ id, name, photoUrl })).map((item, idx) => (
                        <ContactRow key={idx} {...item} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default ContactsPage