import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface User {
  id: string;
  phone: string;
  nickname: string;
  avatar?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    isLoggedIn: false,
    user: null,
    showLoginModal: false,
    login: (user) => {
      set((state) => {
        state.isLoggedIn = true;
        state.user = user;
      });
    },
    logout: () => {
      set((state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
    },
    setShowLoginModal: (show) => {
      set((state) => {
        state.showLoginModal = show;
      });
    },
  }))
);
