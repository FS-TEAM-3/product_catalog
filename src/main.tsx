import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './Root.tsx';
import './index.scss';
import './styles/fonts.scss';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
