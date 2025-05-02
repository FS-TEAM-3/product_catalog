import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/templates/Container';
import styles from './_styles.module.scss';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { useAuthStore } from '../../store/useAuthStore';
import { LoadingOverlay } from '@/components/organisms/LoadingOverlay/LoadingOverlay';
import { Navigate } from 'react-router-dom';

export const AuthPage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  const init = useAuthStore(s => s.init);
  const loading = useAuthStore(s => s.loading);
  const user = useAuthStore(s => s.user);

  useEffect(init, [init]);

  if (loading) {
    return (
      <Container>
        <LoadingOverlay isLoading />
      </Container>
    );
  }

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <Container>
      <h1 className={`${styles.authTitle} h1`}>{t('auth.auth')}</h1>
      <div className={styles.authTabs}>
        <button
          className={tab === 'login' ? styles.active : ''}
          onClick={() => setTab('login')}
        >
          {t('auth.logIn')}
        </button>
        <button
          className={tab === 'signup' ? styles.active : ''}
          onClick={() => setTab('signup')}
        >
          {t('auth.signUp')}
        </button>
      </div>

      {tab === 'login' ? <SignIn /> : <SignUp />}
    </Container>
  );
};
