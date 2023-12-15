import React from 'react';


import styles from './Input.module.scss';

function Input({ type, placeholder, name, onChange }) {
  return (
    <input className={styles.input} placeholder={placeholder} type={type} name={name} onChange={onChange} />
  );
}

export default Input;