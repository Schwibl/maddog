import React from 'react';

const Icon = ({iconId}) => {
  return (
    <svg>
      <use xlinkHref={`MadDog/images/sprite.svg#${iconId}`} />
    </svg>
  );
};

export default Icon;
