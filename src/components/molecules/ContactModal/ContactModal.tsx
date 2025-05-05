import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as Toast from '@radix-ui/react-toast';
import s from './contactModal.module.scss';

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
}

export const ContactModal = ({ open, onClose }: ContactFormProps) => {
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      phone: string;
      message: string;
    };

    try {
      setLoading(true);
      await axios.post('/order/contact', data);
      setLoading(false);
      form.reset();
      setToastMessage(t('form.successMessage'));
      setToastOpen(true);
      onClose();
    } catch (err) {
      setLoading(false);
      setToastMessage(t('form.errorMessage'));
      setToastOpen(true);
      console.log(err);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'contact-modal') {
      onClose();
    }
  };

  return (
    <>
      {open && (
        <div
          className={s.overlay}
          id="contact-modal"
          onClick={handleOverlayClick}
        >
          <div className={s.contactModal}>
            <div className={s.contactModalContent}>
              <h3 className={s.title}>{t('form.ContactUs')}</h3>
              <form className={s.contactForm} onSubmit={sendMessage}>
                <input
                  className={s.contactFormInput}
                  type="text"
                  name="name"
                  placeholder={t('form.name')}
                  required
                  minLength={2}
                />
                <input
                  className={s.contactFormInput}
                  type="email"
                  name="email"
                  placeholder={t('form.email')}
                  required
                />
                <input
                  className={s.contactFormInput}
                  type="tel"
                  name="phone"
                  placeholder={t('form.phone')}
                  required
                  minLength={6}
                />
                <textarea
                  className={s.contactFormTextarea}
                  name="message"
                  placeholder={t('form.message')}
                  rows={3}
                />
                <button
                  type="submit"
                  className={`${s.button} ${s.contactFormButton}`}
                  disabled={loading}
                >
                  {loading ? t('form.sending') : t('form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Toast.Provider>
        <Toast.Root open={toastOpen} onOpenChange={setToastOpen}>
          <Toast.Title className={s.toastContent}>{toastMessage}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </>
  );
};
