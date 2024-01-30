import styles from './ToolRow.module.scss';

function ToolRow(props) {
  const { id, name, quantity, sections, setSections } = props;
  return (
    <div className={styles.tool} id={id}>
      <button className={styles.toolDelete}>X</button>
      <input className={styles.toolName} name='name' type='text' value={name}></input>
      <input className={styles.toolQuantity} name='quantity' type='number' value={quantity} />
    </div>
  );
}

export default ToolRow;
