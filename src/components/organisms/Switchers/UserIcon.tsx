import { UserRoundCheck, UserRoundX } from 'lucide-react';
import styles from './_styles.module.scss';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const UserIcon = () => {
  const user = useAuthStore(s => s.user);
  const navigate = useNavigate();

  return (
    <div className={styles.languageHolder}>
      <button onClick={() => navigate('/auth')}>
        {user ? <UserRoundCheck /> : <UserRoundX />}
      </button>
    </div>
  );
};
