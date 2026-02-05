import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

const googleProvider = new GoogleAuthProvider();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      error: null,

      // Inscription avec email et mot de passe
      signUp: async (email, password, displayName) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, displayName }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de l\'inscription');
          }

          // Créer l'utilisateur dans Firebase
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          set({
            user: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              displayName,
            },
            loading: false,
          });

          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Connexion avec email et mot de passe
      signIn: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);

          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la connexion');
          }

          set({
            user: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              displayName: userCredential.user.displayName,
            },
            loading: false,
          });

          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Connexion avec Google
      signInWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const idToken = await result.user.getIdToken();

          const response = await fetch(`${API_URL}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la connexion Google');
          }

          set({
            user: {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
            },
            loading: false,
          });

          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Déconnexion
      signOutUser: async () => {
        set({ loading: true, error: null });
        try {
          await signOut(auth);
          set({ user: null, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Initialiser l'authentification
      initAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            set({
              user: {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              loading: false,
            });
          } else {
            set({ user: null, loading: false });
          }
        });
        return unsubscribe;
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
