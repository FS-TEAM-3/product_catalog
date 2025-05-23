/* eslint-disable */
import { create } from 'zustand';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/firebase';
import operations from '@/utils/authOperations';

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;

  init: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  loading: true,
  error: null,

  init: () => {
    onAuthStateChanged(auth, async fbUser => {
      set({ user: fbUser, loading: false });
    });
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('test', user);
      const token = await user.getIdToken();
      console.log(token);
      await operations.logInUser(token);
      set({ user });
    } catch (e: any) {
      set({ loading: true });
      await firebaseSignOut(auth);
      await operations.logOut();
      set({ error: e.message });
      set({ user: null, loading: false });

      throw new Error('No this user in our database');
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password, displayName) => {
    set({ loading: true, error: null });
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(user, { displayName });
      const token = await user.getIdToken();
      console.log(token);
      await operations.signUpUser(token);
      set({ user });
    } catch (e: any) {
      set({ error: e.message });
      set({ loading: true });
      await firebaseSignOut(auth);
      await operations.logOut();
      set({ error: e.message });
      set({ user: null, loading: false });

      throw new Error('Something wrong');
    } finally {
      set({ loading: false });
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null });

    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      if (user) {
        const token = await user.getIdToken();
        console.log('token', token);
        try {
          await operations.authWithGoogle(token);
          set({ user });
          return;
        } catch (error) {
          console.warn('Login via Firebase failed', error);
        }
      }

      throw new Error('No user returned from Firebase');
    } catch (e: any) {
      set({ error: e.message });

      set({ loading: true });
      await firebaseSignOut(auth);
      await operations.logOut();
      set({ user: null, loading: false });

      throw new Error('No this user in our dataBase');
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true });
    await firebaseSignOut(auth);
    await operations.logOut();
    set({ user: null, loading: false });
  },
}));
