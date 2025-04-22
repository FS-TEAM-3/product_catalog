import { Link } from 'react-router-dom';

import s from './footer.module.scss';
import { Container } from '@/components/atoms/Container';

export const Footer = () => {
  const linkList = [
    { name: 'github', path: 'https://github.com/FS-TEAM-3' },
    { name: 'contacts', path: 'https://github.com/FS-TEAM-3' },
    { name: 'rights', path: '/rights' },
  ];

  return (
    <footer className={s.box}>
      <Container>
        <div>
          <h2>Logo</h2>
        </div>

        <div>
          <ul className={s.linkList}>
            {linkList.map(item => (
              <li>
                <Link to={`${item.path}`} className={s.link}>
                  {item.name.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>Back to top Button</div>
      </Container>
    </footer>
  );
};
