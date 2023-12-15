import styles from './EstimateTable.module.scss';
import EstimateTableEquipment from './EstimateTableEquipment';
import EstimateTableHead from './EstimateTableHead';
import EstimateTableService from './EstimateTableService';

export default function EstimateTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <EstimateTableHead />
        <EstimateTableEquipment />
        <EstimateTableService/>
      </table>
    </div>
  );
}
