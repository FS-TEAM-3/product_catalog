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

  const currentIndex = images.indexOf(selectedImage);

  const showPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  //Бібліотека react-swipeable для того щоб можна було свайпати на мобільних пристроях
  const handlers = useSwipeable({
    onSwipedLeft: showNext,
    onSwipedRight: showPrev,
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
                src={img}
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
            onClick={() => setIsModalOpen(true)}
          >
            <img src={selectedImage} alt="Selected" className="main-photo" />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {/*Функція stopPropagation для того щоб не закривалось модальне вікно при кліку на зображення */}
            <button className="modal-arrow left" onClick={showPrev}>
              <ArrowLeft />
            </button>
            <div {...handlers}>
              <img
                src={selectedImage}
                className="modal-image"
                alt="Large preview"
              />
            </div>
            <button className="modal-arrow right" onClick={showNext}>
              <ArrowRight />
            </button>
            <div className="modal-thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`modal-thumb-${index}`}
                  className={`modal-thumb ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
