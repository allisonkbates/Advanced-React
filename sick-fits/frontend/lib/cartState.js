import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider! We will store data and functionality and anyone can access it via the consumer

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    return setCartOpen(!cartOpen);
  }

  function closeCart() {
    return setCartOpen(false);
  }

  function openCart() {
    return setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
