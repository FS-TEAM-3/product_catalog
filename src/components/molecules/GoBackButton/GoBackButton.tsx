import styles from './_styles.module.scss';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

type Props = {
  category: string;
};

export const GoBackButton: React.FC<Props> = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${category}`, { replace: true });
  };

  return (
    <Button onClick={handleClick} className={styles.button}>
      <ChevronLeft />
      <span>Back</span>
    </Button>
  );
};
