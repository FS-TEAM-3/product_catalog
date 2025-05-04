import React, { useEffect } from 'react';
import styles from './_styles.module.scss';
import { Loader } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
}) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = '15px';
    } else {
      document.body.style.overflow = '';
      document.body.style.marginRight = '0';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  if (!isLoading) return null;
  return (
    <div className={styles.overlay}>
      <Loader className={styles.spinner} />
    </div>
  );
};
