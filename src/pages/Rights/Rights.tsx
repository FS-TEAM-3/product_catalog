import React from 'react';
import styles from './_style.module.scss';
import { useTranslation } from 'react-i18next';

export const Rights: React.FC = () => {
  const { t } = useTranslation();

  const rightsList = Array.from({ length: 8 }, (_, i) => (i + 1).toString());

  return (
    <div className={styles.rightsPage}>
      <h1>{t('rights.title')}</h1>

      {rightsList.map(key => (
        <section key={key}>
          <h2>
            {key}. {t(`rights.${key}.title`)}
          </h2>
          <p>{t(`rights.${key}.description`)}</p>
        </section>
      ))}
    </div>
  );
};
