import styles from './Select.module.scss';

import React from 'react'

function Select({ items, placeholder, onChange, name }) {
    return (
        <select className={styles.select} onChange={onChange} name={name}>
            <option value=''>{placeholder}</option>
            {items.map((item) => (
                <option value={item} key={item} className={styles.option}>{item}</option>
            ))}
        </select>
    )
}

export default Select