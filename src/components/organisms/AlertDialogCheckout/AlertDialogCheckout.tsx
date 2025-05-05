import { AlertDialog } from 'radix-ui';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { useTranslation } from 'react-i18next';
import styles from './_styles.module.scss';

type Props = {
  onCancel: () => void;
  onAction: () => void;
};

export const AlertDialogCheckout: React.FC<Props> = ({
  onCancel,
  onAction,
}) => {
  const { t } = useTranslation();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <RectangleButton>{t('cart.checkout')}</RectangleButton>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.Overlay} />
        <AlertDialog.Content className={styles.Content}>
          <AlertDialog.AlertDialogCancel className={styles.Cancel}>
            X
          </AlertDialog.AlertDialogCancel>
          <AlertDialog.Title className={styles.Title}>
            {t('cart.notImplement')}
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.Description}>
            {t('cart.wantClear')}
          </AlertDialog.Description>
          <div
            className={styles.btnHolder}
            style={{
              display: 'flex',
              gap: 25,
              justifyContent: 'flex-end',
            }}
          >
            <AlertDialog.Cancel asChild>
              <RectangleButton onClick={() => onCancel()}>
                {t('cart.cancel')}
              </RectangleButton>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className={`${styles.Button} green`}
                onClick={() => onAction()}
              >
                {t('cart.yesClear')}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
