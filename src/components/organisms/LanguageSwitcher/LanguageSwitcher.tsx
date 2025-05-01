import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './_styles.module.scss';

type Props = {
  isUa: boolean;
};

export const LanguageSwitcher = ({ isUa }: Props) => {
  const { i18n } = useTranslation();
  const [isUA, setIsUA] = useState<boolean>(isUa);

  const changeLanguage = (lng: string) => {
    setIsUA(!isUA);
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageHolder}>
      <button
        style={{ display: isUA ? 'block' : 'none' }}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        style={{ display: isUA ? 'none' : 'block' }}
        onClick={() => changeLanguage('uk')}
      >
        UA
      </button>
    </div>
  );
};
