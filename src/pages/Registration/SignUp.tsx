/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CustomSeparator } from '@/components/atoms/CustomSeparator/CustomSeparator.tsx';
import googleLogo from '../../../public/google-icon-logo-svgrepo-com.svg';
import { Eye, EyeClosed } from 'lucide-react';

const googleProvider = new GoogleAuthProvider();
const NAME_REGEX = /^[A-Za-z\u0400-\u04FF ]{2,40}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export const SignUp = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validateName() {
    if (!NAME_REGEX.test(username.trim())) {
      setNameError(true);
      //setNameError(t('auth.invalidName'));
      return false;
    }
    setNameError(false);
    return true;
  }

  function validatePass() {
    if (!PASS_REGEX.test(password)) {
      setPassError(true);
      //setPassError(t('auth.weakPassword'));
      return false;
    }
    setPassError(false);
    return true;
  }

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nameOk = validateName();
    const passOk = validatePass();
    if (!nameOk || !passOk) return;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(user, { displayName: username });
      setUsername('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
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
        <div className={styles.passwordWrapper}>
          <input
            type="text"
            placeholder={t('auth.name')}
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              setNameError(false);
            }}
            onBlur={validateName}
          />
        </div>
        {nameError && (
          <div className={styles.fieldError}>{t('auth.invalidName')}</div>
        )}

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

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.password')}
            name="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setPassError(false);
            }}
            onBlur={validatePass}
            required
          />
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        {passError && (
          <div className={styles.fieldError}>{t('auth.weakPassword')}</div>
        )}
        {error && <div className={styles.fieldError}>{t('auth.exist')}</div>}

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
