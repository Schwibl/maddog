import styles from './Select.module.scss';

import React from 'react'

function Select({ items, placeholder, onChange }) {
    return (
        <select className={styles.select} onChange={onChange}>
            <option value="">{placeholder}</option>
            {items.map((item, idx) => (
                <option value={item} key={idx} className={styles.option}>{item}</option>
            ))}
        </select>
    )
}

export default Select