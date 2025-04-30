import styles from './_styles.module.scss';
import { RectangleButton } from '@/components/atoms/RectangleButton';
import { Container } from '@/components/templates/Container';
import { useState } from 'react';

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      // handle login logic here
      console.log('Logging in...');
    } else {
      // handle signup logic here
      console.log('Signing up...');
    }
  };

  return (
    <Container>
      <h1 className={`${styles.authTitle} h1`}>Registration Page</h1>
      <div className={styles.authTabs}>
        <button
          className={activeTab === 'login' ? styles.active : ''}
          onClick={() => setActiveTab('login')}
        >
          Log In
        </button>
        <button
          className={activeTab === 'signup' ? styles.active : ''}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      <form className={styles.authForm} onSubmit={handleSubmit}>
        {activeTab === 'signup' && (
          <input type="text" placeholder="Name" name="name" required />
        )}

        <input type="email" placeholder="Email" name="email" required />

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />

        <RectangleButton onClick={() => handleSubmit}>Submit</RectangleButton>
      </form>
    </Container>
  );
};
