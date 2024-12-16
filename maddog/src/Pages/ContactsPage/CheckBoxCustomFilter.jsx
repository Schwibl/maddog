import { useGridFilter } from 'ag-grid-react';
import React, { useState, useEffect } from 'react';

/**
 * @description Панель фильтрации для таблицы AgGrid в виде чекбоксов.
 * @param {*} props пропсы таблицы
 * @returns {JSX.Element}
 */
const CheckboxFilter = (props) => {
  const [checkedItems, setCheckedItems] = useState({});

  const onCheckboxChange = (event) => {
    const newCheckedItems = {
      ...checkedItems,
      [event.target.value]: event.target.checked,
    };
    setCheckedItems(newCheckedItems);
  };
  

  useEffect(() => {
    const checkedValues = Object.keys(checkedItems).filter((key) => checkedItems[key]);
    props.filterChangedCallback(checkedValues);
  }, [checkedItems, props]);

  useEffect(() => {
    if (props.typesValues.length > 0) {
      const newCheckedItems = { ...checkedItems };
      newCheckedItems[props.typesValues[0]] = true;
      setCheckedItems(newCheckedItems);
    }
  }, [props.typesValues]);

  const doesFilterPass = (params) => {
    return true;
  };

  useGridFilter({ doesFilterPass });

  return (
    <div className='ag-filter-body-wrapper ag-simple-filter-body-wrapper'>
      {props.typesValues.map((value) => (
        <div key={value}>
          <input
            type='checkbox'
            value={value}
            checked={checkedItems[value] || false}
            onChange={onCheckboxChange}
          />
          <label> {value}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxFilter;
