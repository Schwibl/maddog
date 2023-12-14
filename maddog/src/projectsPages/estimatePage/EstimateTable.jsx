import styles from './EstimateTable.module.scss'
import EstimateTableHead from './EstimateTableHead'

export default function EstimateTable() {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <EstimateTableHead/>
            </table>
        </div>
    )
}