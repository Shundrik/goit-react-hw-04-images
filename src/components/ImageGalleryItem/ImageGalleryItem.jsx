import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({webformatURL, largeImageURL, alt}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        onClick={toggleModal}
        alt=""
      />
      {showModal && (
        <Modal alt={alt} modalImg={largeImageURL} closeModal={toggleModal} />
      )}
    </li>
  );
};
