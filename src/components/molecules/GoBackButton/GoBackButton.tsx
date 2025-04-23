import styles from './_styles.module.scss';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

export const GoBackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleClick} className={styles.button}>
      <ChevronLeft />
      <span>Back</span>
    </Button>
  );
};
