import {useEffect} from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

// Ищем элемент с id="modal" в DOM дереве, чтобы отображать в нем модальное окно
const modalRoot = document.getElementById('modal');

const Modal = ({ children, onClose, isOpen }) => {
  const closeByEsc = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const closeByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeByEsc);
      return () => {
        document.removeEventListener('keydown', closeByEsc);
      };
    }
  }, [isOpen]);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <div onClick={closeByOverlay} className={styles.overlay}>
        {children}
      </div>,
      modalRoot
    )
  );
};

export default Modal;
