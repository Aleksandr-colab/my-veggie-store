

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useCartHook = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartHook должен использоваться внутри CartProvider');
  }
  return context; 
};