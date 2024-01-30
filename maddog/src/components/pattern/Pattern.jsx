import { useState } from 'react';

import ToolRow from './ToolRow';


import styles from './Pattern.module.scss';

function Pattern(props) {
  const [sections, setSections] = useState(props.sections);

  return (
    <div className={styles.table}>
      {sections
        .filter(({ name }) => name != 'ОБСЛУЖИВАНИЕ')
        .map((toolSection) => {
          return (
            <div className={styles.sectionWrap} id={toolSection.id}>
              <h2 className={styles.sectionName}>
                {toolSection.name} <span className={styles.deleteSection}>Удалить секцию</span>
              </h2>
              <div className={styles.sectionHeader}>
                <p className={styles.headerDelete}>Удалить</p>
                <p>Название</p>
                <p>Количество</p>
              </div>
              <div className={styles.toolsWrap}>
                {toolSection.tools.map((tool) => (
                  <ToolRow
                    key={tool.id}
                    id={tool.id}
                    name={tool.name}
                    quantity={tool.quantity}
                    sections={sections}
                    setSections={setSections}
                  ></ToolRow>
                ))}
              </div>
              <div className={styles.addToolWrap}>
                <button className={styles.addTool}>+ Добавить оборудование</button>
              </div>
            </div>
          );
        })}

      <h2>Обслуживание</h2>
    </div>
  );
}

export default Pattern;
