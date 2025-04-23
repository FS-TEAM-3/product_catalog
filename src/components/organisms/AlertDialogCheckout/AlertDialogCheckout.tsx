import { AlertDialog } from 'radix-ui';

import { RectangleButton } from '@/components/atoms/RectangleButton';

import styles from './_styles.module.scss';

type Props = {
  onCancel: () => void;
  onAction: () => void;
};

export const AlertDialogCheckout: React.FC<Props> = ({
  onCancel,
  onAction,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <RectangleButton>Checkout</RectangleButton>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.Overlay} />
        <AlertDialog.Content className={styles.Content}>
          <AlertDialog.Title className={styles.Title}>
            Checkout is not implemented yet.
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.Description}>
            Do you wan't to clear the Cart?
          </AlertDialog.Description>
          <div
            style={{
              display: 'flex',
              gap: 25,
              justifyContent: 'flex-end',
            }}
          >
            <AlertDialog.Cancel asChild>
              <button className={`${styles.Button}`} onClick={() => onCancel()}>
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className={`${styles.Button} red`}
                onClick={() => onAction()}
              >
                Yes, clear the Cart!
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
