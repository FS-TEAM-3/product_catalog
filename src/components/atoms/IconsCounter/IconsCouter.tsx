import s from './IconsCounter.module.scss';

export const IconCounter = ({ count }: { count: number }) => {
  return (
    <div className={s.box}>
      {count > 0 && <p className={s.count}>{count}</p>}
    </div>
  );
};
