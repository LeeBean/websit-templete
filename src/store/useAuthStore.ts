import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';

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
// 实现方案摘要
// 1. 引入持久化中间件 ( useAuthStore.ts ) 我为 useAuthStore 引入了 Zustand 的 persist 中间件，将登录状态存储在浏览器的 localStorage 中。由于同源的标签页共享同一个 localStorage ，这实现了数据的物理共享。
// 2. 状态精细化持久化
// - 存储名称 : 设置为 auth-storage 。
// - 按需持久化 (Partialize) : 使用 partialize 过滤掉了 showLoginModal 状态。
// - 效果 : 当您在标签页 A 登录后，刷新标签页 B 会自动获取登录态；但如果您在标签页 A 打开了登录弹窗，刷新标签页 B 时不会自动弹出弹窗，确保了用户体验的自然性。
export const useAuthStore = create<AuthState>()(
  persist(
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
    })),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ 
        isLoggedIn: state.isLoggedIn, 
        user: state.user 
      }), // Only persist login status and user info, don't persist modal visibility
    }
  )
);
