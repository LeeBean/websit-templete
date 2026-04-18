import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  spec?: string;
}

interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

interface MallState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelection: (productId: string) => void;
  toggleAll: (selected: boolean) => void;
  clearCart: () => void;
}

export const useMallStore = create<MallState>()(
  immer((set) => ({
    cart: [],
    addToCart: (product, quantity) => {
      set((state) => {
        const existing = state.cart.find((item) => item.id === product.id);
        if (existing) {
          existing.quantity += quantity;
        } else {
          state.cart.push({ ...product, quantity, selected: true });
        }
      });
    },
    removeFromCart: (productId) => {
      set((state) => {
        state.cart = state.cart.filter((item) => item.id !== productId);
      });
    },
    updateQuantity: (productId, quantity) => {
      set((state) => {
        const item = state.cart.find((i) => i.id === productId);
        if (item) {
          item.quantity = Math.max(1, quantity);
        }
      });
    },
    toggleSelection: (productId) => {
      set((state) => {
        const item = state.cart.find((i) => i.id === productId);
        if (item) {
          item.selected = !item.selected;
        }
      });
    },
    toggleAll: (selected) => {
      set((state) => {
        state.cart.forEach((item) => (item.selected = selected));
      });
    },
    clearCart: () => {
      set((state) => {
        state.cart = [];
      });
    },
  }))
);
