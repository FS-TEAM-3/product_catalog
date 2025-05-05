import { RectangleButton } from '@/components/atoms/RectangleButton';
import { useTranslation } from 'react-i18next';
import styles from './_styles.module.scss';
import { FormEvent, useState } from 'react';
import { CustomSeparator } from '@/components/atoms/CustomSeparator/CustomSeparator.tsx';
import googleLogo from '../../../public/google-icon-logo-svgrepo-com.svg';
import { useAuthStore } from '@/store/useAuthStore.ts';
import { Container } from 'lucide-react';
import { LoadingOverlay } from '@/components/organisms/LoadingOverlay/LoadingOverlay.tsx';

export const SignIn = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useAuthStore(s => s.signIn);
  const signInWithGoogle = useAuthStore(s => s.signInWithGoogle);
  const loading = useAuthStore(s => s.loading);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      setEmail('');
      setPassword('');
    } catch {
      console.log('error');
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingOverlay isLoading />
      </Container>
    );
  }

  return (
    <div className={styles.auth}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={t('auth.email')}
          name="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          required
        />

        <input
          type="password"
          placeholder={t('auth.password')}
          name="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          required
        />

        <RectangleButton>{t('auth.logInButton')}</RectangleButton>

        <CustomSeparator />
        <span>{t('auth.or')}</span>
        <RectangleButton type="button" onClick={signInWithGoogle}>
          <img
            src={googleLogo}
            className={styles.iconImg}
            alt="Google sign-in"
          />
          {t('auth.logInGoogleButton')}
        </RectangleButton>
      </form>
    </div>
  );
};
