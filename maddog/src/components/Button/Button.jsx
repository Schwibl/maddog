import React from 'react'
import styles from './Button.module.scss'; 

function Button({ type, label }) {
    return (
        <button type={type} className={styles.button}>{label}</button>
    )
}

export default Button