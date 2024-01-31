import ToolRow from './ToolRow';

import styles from './Pattern.module.scss';

function SectionPattern(props) {
  const { id, name, tools, sections, setSections } = props;
  return (
    <div className={styles.sectionWrap} id={id}>
      <h2 className={styles.sectionName}>
        {name} <span className={styles.deleteSection}>Удалить секцию</span>
      </h2>
      <div className={styles.sectionHeader}>
        <p className={styles.headerDelete}>Удалить</p>
        <p>Название</p>
        <p>Количество</p>
      </div>
      <div className={styles.toolsWrap}>
        {tools.map((tool) => (
          <ToolRow
            key={tool.id}
            tool={tool}
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
}

export default SectionPattern;
