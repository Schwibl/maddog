import { useState } from 'react';

import SectionPattern from './SectionPattern';
import ToolRow from './ToolRow';

import styles from './Pattern.module.scss';

function Pattern(props) {
  const [sections, setSections] = useState(props.sections);

  return (
    <div className={styles.table}>
      {sections
        .filter(({ name }) => name != 'ОБСЛУЖИВАНИЕ')
        .map((toolSection) => (
          <SectionPattern
            id={toolSection.id}
            name={toolSection.name}
            tools={toolSection.tools}
            sections={sections}
            setSections={setSections}
          ></SectionPattern>
        ))}

      <h2>Обслуживание</h2>
    </div>
  );
}

export default Pattern;
