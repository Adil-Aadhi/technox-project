import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [grandTotal, setGrandTotal] = useState(0);

  return (
    <CartContext.Provider value={{ grandTotal, setGrandTotal }}>
      {children}
    </CartContext.Provider>
  );
}
