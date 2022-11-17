import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, modalImg, alt }) => {
  useEffect(() => {
    const closeByEscape = e => {
      console.log(e);
      if (e.code !== 'Escape') {
        return;
      }
      closeModal();
    }
    window.addEventListener('keydown', closeByEscape);
    return () => window.removeEventListener('keydown', closeByEscape);
  }, [closeModal]);

   return createPortal(
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={modalImg} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};
