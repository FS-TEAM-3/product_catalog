import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { useTranslation } from 'react-i18next';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { UserPage } from './UserPage';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.ts';
import type { User } from 'firebase/auth';
import { LoadingOverlay } from '@/components/organisms/LoadingOverlay/LoadingOverlay.tsx';

export const AuthPage = () => {
  const { t } = useTranslation();
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <Container>
        <LoadingOverlay isLoading={true} />
      </Container>
    );
  }

  if (authUser) {
    return <UserPage authUser={authUser} />;
  }

  return (
    <Container>
      <h1 className={`${styles.authTitle} h1`}>{t('auth.auth')}</h1>
      <div className={styles.authTabs}>
        <button
          className={activeTab === 'login' ? styles.active : ''}
          onClick={() => setActiveTab('login')}
        >
          {t('auth.logIn')}
        </button>
        <button
          className={activeTab === 'signup' ? styles.active : ''}
          onClick={() => setActiveTab('signup')}
        >
          {t('auth.signIn')}
        </button>
      </div>
      {activeTab === 'login' ? <SignIn /> : <SignUp />}
    </Container>
  );
};
