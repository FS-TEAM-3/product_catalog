import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

import './PicturePicker.scss';

interface PicturePickerProps {
  images: string[];
}

export const PicturePicker: React.FC<PicturePickerProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const currentIndex = images.indexOf(selectedImage);
  const modalIndex = modalImage ? images.indexOf(modalImage) : -1;

  const showPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const showModalPrev = () => {
    if (modalImage === null) return;
    const prevIndex = (modalIndex - 1 + images.length) % images.length;
    setModalImage(images[prevIndex]);
  };

  const showModalNext = () => {
    if (modalImage === null) return;
    const nextIndex = (modalIndex + 1) % images.length;
    setModalImage(images[nextIndex]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: showNext,
    onSwipedRight: showPrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const modalHandlers = useSwipeable({
    onSwipedLeft: showModalNext,
    onSwipedRight: showModalPrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <>
      <div className="picker-wrapper">
        <div className="thumbnails-column">
          {images.map((img, index) => (
            <div
              key={index}
              className={`thumbnail-block ${selectedImage === img ? 'active' : ''}`}
            >
              <img
                src={`/${img}`}
                alt={`thumb-${index}`}
                className="thumb-img"
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>
        <div {...handlers}>
          <div
            className="main-photo-wrapper"
            onClick={() => {
              setModalImage(selectedImage);
              setIsModalOpen(true);
            }}
          >
            <img
              src={`/${selectedImage}`}
              alt="Selected"
              className="main-photo"
            />
          </div>
        </div>
      </div>

      {isModalOpen && modalImage && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-arrow left" onClick={showModalPrev}>
              <ArrowLeft />
            </button>
            <div {...modalHandlers}>
              <img
                src={`/${modalImage}`}
                className="modal-image"
                alt="Large preview"
              />
            </div>
            <button className="modal-arrow right" onClick={showModalNext}>
              <ArrowRight />
            </button>
            <div className="modal-thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`/${img}`}
                  alt={`modal-thumb-${index}`}
                  className={`modal-thumb ${modalImage === img ? 'active' : ''}`}
                  onClick={() => setModalImage(img)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
