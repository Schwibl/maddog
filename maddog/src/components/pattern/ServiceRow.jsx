import CloseIcon from '@mui/icons-material/Close';

import styles from './Pattern.module.scss';

function ServiceRow(props) {
  const { id, name, quantity, tool } = props;

  function handleDeleteTool() {}
  return (
    <>
      <div className={styles.service} id={id}>
        <button className={styles.toolDelete} onClick={handleDeleteTool}>
          <CloseIcon />
        </button>
        <input className={styles.toolName} name='name' type='text' value={name}></input>
        <input
          className={styles.toolQuantity}
          name='quantity'
          type='number'
          value={quantity}
        />
      </div>
    </>
  );
}

export default ServiceRow;
