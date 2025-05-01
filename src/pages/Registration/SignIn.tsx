import { RectangleButton } from '@/components/atoms/RectangleButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import styles from './_styles.module.scss';
import { useState } from 'react';
import { auth } from '../../firebase.ts';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CustomSeparator } from '@/components/atoms/CustomSeparator/CustomSeparator.tsx';
import googleLogo from '../../../public/google-icon-logo-svgrepo-com.svg';

const googleProvider = new GoogleAuthProvider();

export const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
        console.log('Signed up:', user);
        setEmail('');
        setPassword('');
        setError('');
        navigate('/user');
      })
      .catch(e => {
        console.log(error, e);
        setError('not found account');
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
      <form className={styles.authForm} onSubmit={login}>
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

        <RectangleButton>{t('auth.signInButton')}</RectangleButton>

        <CustomSeparator />
        <span>or</span>
        <RectangleButton type="button" onClick={loginWithGoogle}>
          <img
            src={googleLogo}
            className={styles.iconImg}
            alt="Google sign-in"
          />
          SignIn with Google
          {/* {t('auth.googleSignIn')} */}
        </RectangleButton>
      </form>
    </div>
  );
};
