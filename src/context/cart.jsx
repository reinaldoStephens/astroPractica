import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        // chequear si el producto esta en el carro
        const productInCartIndex = cart.findIndex((item) => item.id === product.id);

        if (productInCartIndex >= 0) {
            const newCart = structuredClone(cart);
            newCart[productInCartIndex].quantity += 1;
            return setCart(newCart);
        }

        // si el producto no esta en el carrito
        setCart((prevState) => [
            ...prevState,
            {
                ...product,
                quantity: 1,
            },
        ]);

        setCart([...cart, product]);
    };
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
