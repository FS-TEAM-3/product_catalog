import s from './sectionTitle.module.scss';

export const SectionTitle = ({ title }: { title: string }) => {
  return <h2 className={s.title}>{title}</h2>;
};
