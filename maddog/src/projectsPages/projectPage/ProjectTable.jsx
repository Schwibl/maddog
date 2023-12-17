
import ProjectRow from './ProjectRow';

import styles from './ProjectPage.module.scss';

function ProjectTable({ projects, searchValue }) {
  const headers = [
    'Проект',
    'Статус',
    'Контакт',
    'Телефон',
    'Начало аренды',
    'Окончание аренды',
    'Дата и время создания',
    'Сотрудник',
    'Примечание',
    'Тип',
    'Открыть смету',
  ];

  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridRowHeader}>
        {headers.map((header, index) => (
          <div className={styles.gridHeader} key={index}>
            {header}
          </div>
        ))}
      </div>
      {projects
        .filter((project) =>
          project.projectName.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((project, index) => (
          <ProjectRow key={index} {...project} />
        ))}
    </div>
  );
}

export default ProjectTable;
