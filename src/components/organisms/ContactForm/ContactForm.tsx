import { ContactButton } from '@/components/molecules/ContactButton/ContactButton';
import { ContactModal } from '@/components/molecules/ContactModal/ContactModal';
import { useState } from 'react';

export const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <ContactModal onClose={toggleModal} open={isOpen} />
      <ContactButton onPhoneClick={toggleModal} />
    </>
  );
};
