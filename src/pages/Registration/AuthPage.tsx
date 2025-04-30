import styles from './_styles.module.scss';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { Container } from '@/components/templates/Container';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AuthPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      // handle login logic here
      console.log('Logging in...');
    } else {
      // handle signup logic here
      console.log('Signing up...');
    }
  };

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

      <form className={styles.authForm} onSubmit={handleSubmit}>
        {activeTab === 'signup' && (
          <input
            type="text"
            placeholder={t('auth.name')}
            name="name"
            required
          />
        )}

        <input
          type="email"
          placeholder={t('auth.email')}
          name="email"
          required
        />

        <input
          type="password"
          placeholder={t('auth.password')}
          name="password"
          required
        />

        <RectangleButton onClick={() => handleSubmit}>
          {t('auth.submit')}
        </RectangleButton>
      </form>
    </Container>
  );
};
