import { useState } from 'react';
import { ArrowAnimation } from '@/components/molecules/ArrowAnimation/AnimateArrow';
import { motion, AnimatePresence } from 'framer-motion';
import './_style.module.scss';
import styles from './_style.module.scss';
import { useTranslation } from 'react-i18next';

export const Contacts: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { t } = useTranslation();

  const contacts = [
    {
      id: 1,
      name: t('personName.Sonia'),
      photo: '/public/img/ContactPhotos/Sonia.jpg',
      description: t('personDescription.Sonia'),
    },
    {
      id: 2,
      name: t('personName.Kate'),
      photo: 'https://via.placeholder.com/150',
      description: t('personDescription.Kate'),
    },
    {
      id: 3,
      name: t('personName.Tania'),
      photo: '/public/img/ContactPhotos/Tania.jpg',
      description: t('personDescription.Tania'),
    },
    {
      id: 4,
      name: t('personName.Dmytro'),
      photo: '/public/img/ContactPhotos/Dmytro.jpg',
      description: t('personDescription.Dmytro'),
    },
  ];

  const toggleDescription = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.contactsGrid}>
        {contacts.map(contact => (
          <div key={contact.id} className={styles.contactCardWrapper}>
            <div className={styles.contactCard}>
              <img
                src={contact.photo}
                alt={contact.name}
                className={styles.contactPhoto}
              />
              <h2 className={styles.contactName}>{contact.name}</h2>
              <button
                onClick={() => toggleDescription(contact.id)}
                className={styles.contactButton}
              >
                <ArrowAnimation isOpen={openId === contact.id} />
              </button>
            </div>

            <AnimatePresence>
              {openId === contact.id && (
                <motion.div
                  className={styles.contactDescriptionOverlay}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{contact.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
