import classNames from 'classnames';
import React from 'react';

import styles from './Select.module.scss';

function Select({ items, placeholder, onChange, name, value, className}) {

  // Можно задать дополнительные стили, передав их как обычно в пропсе className
  const selectClasses = classNames(styles.select, { [className]: className });
  
  return (
    <select className={selectClasses} onChange={onChange} name={name} value={value}>
      <option value=''>{placeholder}</option>
      {items.map((item) => (
        <option value={item} key={item} className={styles.option}>{item}</option>
      ))}
    </select>
  );
}

export default Select;