"use client";

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useCart, CartItem } from '@/hooks/use-cart';

interface User {
  name: string;
  email: string;
}

interface AppContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  useEffect(() => {
    // Mock checking for a logged-in user, e.g., from a token in localStorage
    const storedUser = localStorage.getItem('shopwave_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (name: string, email: string) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem('shopwave_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopwave_user');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
