import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase.ts';
import type { User } from 'firebase/auth';
import { RectangleButton } from '@/components/atoms/RectangleButton';

function signout() {
  signOut(auth)
    .then(() => {
      console.log('succsses');
    })
    .catch(e => {
      console.log(e);
    });
}

export const UserPage = () => {
  const { t } = useTranslation();
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <Container>
      <h1 className={`${styles.userTitle} h1`}>{t('user.title')}</h1>
      <div className={styles.userTabs}>
        {authUser && (
          <div>
            <span>{authUser.email}</span>
            <RectangleButton type="button" onClick={signout}>
              {t('auth.signout')}
            </RectangleButton>
          </div>
        )}
      </div>
    </Container>
  );
};
