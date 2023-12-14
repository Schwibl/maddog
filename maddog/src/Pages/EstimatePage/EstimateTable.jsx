import styles from "./EstimateTable.module.scss";
import EstimateTableEquipment from "./EstimateTableEquipment";
import EstimateTableHead from "./EstimateTableHead";

export default function EstimateTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <EstimateTableHead />
        <EstimateTableEquipment />
      </table>
    </div>
  );
}
