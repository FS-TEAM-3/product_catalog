import styles from './_styles.module.scss';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const GoBackButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleClick} className={styles.button}>
      <ChevronLeft />
      <span>{t('goBack.back')}</span>
    </Button>
  );
};
