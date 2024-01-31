
import ServiceRow from './ServiceRow';

import styles from './Pattern.module.scss';

function ToolRow(props) {
  const { tool, sections, setSections } = props;

  function handleDeleteTool() {}
  return (
    <>
      <div className={styles.tool} id={tool.id}>
        <button className={styles.toolDelete} onClick={handleDeleteTool}>
          X
        </button>
        <input className={styles.toolName} name='name' type='text' value={tool.name}></input>
        <input
          className={styles.toolQuantity}
          name='quantity'
          type='number'
          value={tool.quantity}
        />
      </div>
      {tool.services ? (
        <div className={styles.services}>
          {tool.services.map((service) => (
            <ServiceRow
              id={service.id}
              name={service.name}
              quantity={tool.quantity}
              sections={sections}
              setSections={setSections}
            ></ServiceRow>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ToolRow;
