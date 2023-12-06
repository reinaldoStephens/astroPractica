import { create } from "zustand";
const cartInitialState = JSON.parse(window.localStorage.getItem("cart")) || [];

export const useCartStore = create((set, get) => ({
    cart: cartInitialState,
    count: () => {
        const { cart } = get();
        if (cart.length) return cart.map((item) => item.count).reduce((prev, curr) => prev + curr);
        return 0;
    },
    add: (product, size) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart, size);
        updateLocalStorage(updatedCart);
        set({ cart: updatedCart });
    },
    remove: (idProduct, size, all) => {
        const { cart } = get();
        const updatedCart = removeCart(idProduct, cart, size, all);
        updateLocalStorage(updatedCart);
        set({ cart: updatedCart });
    },
    removeAll: () => {
        updateLocalStorage([]);
        set({ cart: [] });
    },
}));

function updateCart(product, cart, size) {
    const cartItem = { ...product, count: 1, size: size };

    const productOnCart =
        cart != undefined && cart.length > 0
            ? cart.some((item) => {
                  return item.id === product.id && item.size === size;
              })
            : false;

    if (!productOnCart) cart.push(cartItem);
    else {
        return cart.map((item) => {
            if (item.id === product.id && item.size === size) return { ...item, count: item.count + 1 };
            return item;
        });
    }

    return cart;
}

function removeCart(idProduct, cart, size, all) {
    return cart
        .map((item) => {
            if (item.id === idProduct && item.size === size) return { ...item, count: all ? null : item.count - 1 };
            return item;
        })
        .filter((item) => {
            return item.count;
        });
}

const updateLocalStorage = (state) => {
    window.localStorage.setItem("cart", JSON.stringify(state));
};
