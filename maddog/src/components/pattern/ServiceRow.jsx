import CloseIcon from '@mui/icons-material/Close';


import styles from './Pattern.module.scss';

function ServiceRow(props) {
  const { id, name, quantity, tool, sections, setSections } = props;

  function handleDeleteTool() {
    // Implement delete logic if needed
  }

  return (
    <tr className={styles.serviceRow}>
      <td>
        <button className={styles.serviceDelete} onClick={handleDeleteTool}>
          <CloseIcon />
        </button>
      </td>
      <td>
        <input
          className={styles.serviceName}
          name='name'
          type='text'
          value={name}
          readOnly
        />
      </td>
      <td>
        <input
          className={styles.serviceQuantity}
          name='quantity'
          type='number'
          value={quantity}
        />
      </td>
    </tr>
  );
}

export default ServiceRow;
