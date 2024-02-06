import { useCallback, useState } from 'react';

// Работа с модалкой
export function useModal(initial) {
  const [isOpenModal, setIsOpenModal] = useState(initial);

  const openModal = useCallback(() => setIsOpenModal(() => true), []);
  const closeModal = useCallback(() => setIsOpenModal(() => false), []);

  return {
    isOpenModal,
    openModal,
    closeModal,
  };
}
