import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
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

type Props = {
  authUser: User | null;
};

export const UserPage: React.FC<Props> = ({ authUser }) => {
  const { t } = useTranslation();

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
