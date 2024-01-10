import React from 'react';

import EstimateTableEquipment from './EstimateTableEquipment';
import EstimateTableHead from './EstimateTableHead';
import EstimateTableService from './EstimateTableService';
import EstimateTableTotal from './EstimateTableTotal';

import styles from './EstimateTable.module.scss';

export default React.forwardRef(function EstimateTable(_, ref) {
  return (
    <div className={styles.tableContainer}>
      <table ref={ref} className={styles.table}>
        <EstimateTableHead />
        <EstimateTableEquipment />
        <EstimateTableService/>
        <EstimateTableTotal/>
      </table>
    </div>
  );
});
