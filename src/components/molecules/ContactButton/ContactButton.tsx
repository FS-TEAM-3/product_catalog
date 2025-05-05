import { PhoneIncoming } from 'lucide-react';
import styles from './contactButton.module.scss';

export const ContactButton = ({
  onPhoneClick,
}: {
  onPhoneClick: () => void;
}) => {
  return (
    <button
      onClick={onPhoneClick}
      className={styles.btn}
      aria-label="Toggle Theme"
    >
      <PhoneIncoming />
    </button>
  );
};
