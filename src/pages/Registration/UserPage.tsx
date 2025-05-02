import styles from './_styles.module.scss';
import { Container } from '@/components/templates/Container';
import { useTranslation } from 'react-i18next';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { CustomSeparator } from '@/components/atoms/CustomSeparator/CustomSeparator.tsx';
import { useAuthStore } from '@/store/useAuthStore.ts';

export const UserPage = () => {
  const { t } = useTranslation();

  const authUser = useAuthStore(state => state.user);
  const signout = useAuthStore(state => state.signOut);

  if (!authUser) return null;

  const rawTime = authUser.metadata.creationTime;
  const joinedDate = rawTime ? new Date(rawTime) : null;

  const joinedText = joinedDate
    ? joinedDate.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  return (
    <Container>
      <div className={styles.auth}>
        <div className={styles.authForm}>
          {authUser && (
            <>
              {authUser.photoURL && (
                <img
                  src={authUser.photoURL}
                  alt={authUser.displayName || t('user.avatarAlt')}
                  className={styles.userAvatar}
                />
              )}
              <span className={`${styles.userName} h1`}>
                {authUser.displayName}
              </span>
              <span>{authUser.email}</span>

              {joinedText && authUser.metadata && (
                <div className={styles.userJoined}>
                  {t('auth.joinedOn')}: {joinedText}
                </div>
              )}

              <CustomSeparator />
              <RectangleButton type="button" onClick={signout}>
                {t('auth.signout')}
              </RectangleButton>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
