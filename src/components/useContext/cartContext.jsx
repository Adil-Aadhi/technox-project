import React, { createContext, useContext } from "react";
import useHandleCart from "../customhook/carthook";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cart = useHandleCart()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
