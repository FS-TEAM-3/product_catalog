import styles from './_styles.module.scss';

type CustomSeparatorProps = {
  marginTop?: number;
  marginBottom?: number;
};

export const CustomSeparator = ({
  marginTop = 0,
  marginBottom = 0,
}: CustomSeparatorProps) => {
  return (
    <div
      className={styles.separator}
      style={{
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
      }}
    />
  );
};
