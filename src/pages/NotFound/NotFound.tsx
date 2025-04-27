import { useRef } from 'react';
import { Link } from 'react-router-dom';
import s from './notFound.module.scss';

export const NotFound = () => {
  const sceneRef = useRef(null);

  return (
    <div className={s.box}>
      <main className={s.container} ref={sceneRef}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={`particle-4-${i}`} className={s.particle}>
            4
          </span>
        ))}
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={`particle-0-${i}`} className={s.particle}>
            0
          </span>
        ))}
      </main>

      <article className={s.content}>
        <p className={s.text}>Damnit stranger,</p>
        <p className={s.text}>
          You got lost in the <strong>404</strong> galaxy.
        </p>
        <p className={s.text}>
          <Link to={'/'}>
            <button className={s.buttonLink}>Go back to earth.</button>
          </Link>
        </p>
      </article>
    </div>
  );
};
