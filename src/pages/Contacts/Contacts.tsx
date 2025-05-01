import { useState } from 'react';
import { ArrowAnimation } from '@/components/molecules/ArrowAnimation/AnimateArrow';
import { motion, AnimatePresence } from 'framer-motion';
import './_style.module.scss';
import styles from './_style.module.scss';

const contacts = [
  {
    id: 1,
    name: 'Іван Іваненко',
    photo: 'https://via.placeholder.com/150',
    description:
      'Опис Івана — розробник з Києва.gko[gdkfg sdfogkdfgk sdfgoksdg k spdfkgg psdkgdp ogksd[g ksdf[gk dfg kds[fg ksd[g k Працює над фронтенд частиною проекту. Іван має великий досвід у JavaScript та React.',
  },
  {
    id: 2,
    name: 'Марія Петрівна',
    photo: 'https://via.placeholder.com/150',
    description: 'Опис Марії',
  },
  {
    id: 3,
    name: 'Олег Степанов',
    photo: 'https://via.placeholder.com/150',
    description:
      'Опис Олега — менеджер з Львова. Він відповідає за комунікацію з клієнтами, Працює над покращенням обслуговування клієнтів.',
  },
  {
    id: 4,
    name: 'Аліна Коваль',
    photo: 'https://via.placeholder.com/150',
    description: 'Опис Аліни',
  },
];

export const Contacts: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

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
