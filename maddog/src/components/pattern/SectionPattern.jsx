import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from 'react';

import ToolRow from './ToolRow';


import styles from './Pattern.module.scss';

// id, name, barcode, model, amount, state, photos, tools = [], sections, setSections, description 
function SectionPattern({ 
  section
}) {

  const { id, name, barcode, model, amount, state, photos, tools = [], sections, setSections, description } = section;
  // Если нет инструментов и фотографий, не отображаем секцию
  if (!tools.length && !photos.length) {
    return null;
  }

  return (
    <div className={styles.sectionWrap} id={id}>
      <h2 className={styles.sectionName}>
        {name} <span className={styles.deleteSection}><DeleteOutlineIcon /> Удалить секцию</span>
      </h2>
      <p>Описание: {description || 'Описание отсутствует'}</p>  {/* Отображение описания */}
      <p>Модель: {model}</p>
      <p>Штрихкод: {barcode}</p>
      <p>Количество: {amount}</p>
      <p>Состояние: {state}</p>

      <div className={styles.photos}>
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <img key={index} src={photo} alt={`${name} фото`} className={styles.photo} />
          ))
        ) : (
          <p>Фото не добавлено</p>
        )}
      </div>

      {tools.length > 0 && (
        <>
          <div className={styles.sectionHeader}>
            <p className={styles.headerDelete}>Удалить</p>
            <p>Название</p>
            <p>Количество</p>
          </div>
          <div className={styles.toolsWrap}>
            {tools.map((tool) => (
              <ToolRow
                key={tool.id}
                sectionName={name}
                tool={tool}
                sections={sections}
                setSections={setSections}
              />
            ))}
          </div>
        </>
      )}

      <div className={styles.addToolWrap}>
        <button className={styles.addTool}><AddIcon /> Добавить оборудование</button>
      </div>
    </div>
  );
}

export default SectionPattern;
