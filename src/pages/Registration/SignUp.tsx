import { RectangleButton } from '@/components/atoms/RectangleButton';
import { useTranslation } from 'react-i18next';
import styles from './_styles.module.scss';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase.ts';
import { FirebaseError } from 'firebase/app';
import { CustomSeparator } from '@/components/atoms/CustomSeparator/CustomSeparator.tsx';
import googleLogo from '../../../public/google-icon-logo-svgrepo-com.svg';

const googleProvider = new GoogleAuthProvider();

export const SignUp = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        await updateProfile(user, { displayName: username });
        console.log('Signed up:', user);
        setUsername('');
        setEmail('');
        setPassword('');
        setError('');
      })
      .catch((err: FirebaseError) => {
        console.log(error);
        setError(err.message);
      });
  }

  function loginWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log('Google sign in:', result.user);
      })
      .catch(err => setError(err.message));
  }

  return (
    <div className={styles.auth}>
      <form className={styles.authForm} onSubmit={register}>
        <input
          type="text"
          placeholder={t('auth.name')}
          name="name"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
          required
        />

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

        <RectangleButton type="button" onClick={loginWithGoogle}>
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
