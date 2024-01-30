import styles from './Pattern.module.scss';

function ToolRow(props) {
  const { id, name, quantity, sections, setSections } = props;

  function handleDeleteTool () {

  }
  return (
    <div className={styles.tool} id={id}>
      <button className={styles.toolDelete} onClick={handleDeleteTool}>X</button>
      <input className={styles.toolName} name='name' type='text' value={name}></input>
      <input className={styles.toolQuantity} name='quantity' type='number' value={quantity} />
    </div>
  );
}

export default ToolRow;
