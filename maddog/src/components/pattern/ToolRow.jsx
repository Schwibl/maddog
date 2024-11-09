import CloseIcon from '@mui/icons-material/Close';

import ServiceRow from './ServiceRow';


import styles from './Pattern.module.scss';

function ToolRow(props) {
  const { tool, sections, setSections } = props;

  function handleChangeToolQuantity(e) {
    setSections(
      sections.map((section) => {
        if (section.id === tool.section) {
          section.tools = section.tools.map((sectionTool) => {
            if (sectionTool.id === tool.id) {
              sectionTool.quantity = e.target.value;
            }
            return sectionTool;
          });
        }
        return section;
      })
    );
  }

  function handleDeleteTool(e) {
    setSections(
      sections.map((section) => {
        if (section.id === tool.section) {
          section.tools = section.tools.filter((sectionTool) => sectionTool.id !== tool.id);
        }
        return section;
      })
    );
  }

  return (
    <tr className={styles.toolRow}>
      <td>
        <button className={styles.toolDelete} onClick={handleDeleteTool}>
          <CloseIcon />
        </button>
      </td>
      <td>
        <input
          className={styles.toolName}
          name='name'
          type='text'
          value={tool.name}
          readOnly
        />
      </td>
      <td>
        <input
          className={styles.toolQuantity}
          name='quantity'
          type='number'
          value={tool.quantity}
          onChange={handleChangeToolQuantity}
        />
      </td>
      <td>
        {tool.services && tool.services.length > 0 ? (
          <table className={styles.servicesTable}>
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Service Name</th>
                <th>Service Quantity</th>
              </tr>
            </thead>
            <tbody>
              {tool.services.map((service) => (
                <ServiceRow
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  quantity={tool.quantity}
                  sections={sections}
                  setSections={setSections}
                />
              ))}
            </tbody>
          </table>
        ) : null}
      </td>
    </tr>
  );
}

export default ToolRow;
