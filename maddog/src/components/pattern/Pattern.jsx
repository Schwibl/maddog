import { useState } from 'react';

import SectionPattern from './SectionPattern';
import ToolRow from './ServiceRow';

import styles from './Pattern.module.scss';

function Pattern(props) {
  const [sections, setSections] = useState(props.sections);

  return (
    <div className={styles.table}>
      {/* Проходимся по всем секциям оборудования */}
      {sections
        .map((toolSection) => (
          <SectionPattern
            id={toolSection.id}
            key={`${toolSection.id}${toolSection.name}`}
            name={toolSection.name}
            tools={toolSection.tools}
            sections={sections}
            setSections={setSections}
          ></SectionPattern>
        ))}
    </div>
  );
}

export default Pattern;
