import CloseIcon from '@mui/icons-material/Close';

import ServiceRow from './ServiceRow';

import styles from './Pattern.module.scss';

function ToolRow(props) {
  const { tool, sections, setSections } = props;

  // Изменение количества оборудования
  function handleChangeToolQuantity(e) {
    setSections(
      sections.map((section) => {
        if ((section.id = tool.section)) {
          section.tools.map((sectionTool) => {
            if (sectionTool.id === tool.id) {
              sectionTool.quantity = e.target.value;
            }
          });
        }
        return section;
      })
    );
  }

  // Удаление строки оборудования
  function handleDeleteTool(e) {
    setSections(
      sections.map((section) => {
        if ((section.id = tool.section)) {
          const newTools = section.tools.filter((sectionTool) => sectionTool.id !== tool.id); 
          section.tools = newTools;
          return section;
        }
        return section;
      })
    );
  }

  return (
    <>
      <div className={styles.tool} id={tool.id}>
        <button className={styles.toolDelete} onClick={handleDeleteTool}>
          <CloseIcon />
        </button>
        <input className={styles.toolName} name='name' type='text' value={tool.name}></input>
        <input
          className={styles.toolQuantity}
          name='quantity'
          type='number'
          value={tool.quantity}
          onChange={handleChangeToolQuantity}
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
