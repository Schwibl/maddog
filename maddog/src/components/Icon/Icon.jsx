import React from 'react';

/**
 * @description Компонент для отображения иконок
 * Все иконки находятся в спрайте в публичной папке /images/sprite.svg
 * @param {iconId: string} iconId - id необходимой иконки, можно получить при помощи расширения для VSCode SVG Sprites Viewer 
 * @returns {JSX.Element} 
 */


const Icon = ({iconId}) => {
  return (
    <svg>
      <use xlinkHref={`/images/sprite.svg#${iconId}`} />
    </svg>
  );
};

export default Icon;
