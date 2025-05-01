import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';

export const AuthPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

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

      {activeTab === 'signup' ? <SignUp /> : <SignIn />}
    </Container>
  );
};
