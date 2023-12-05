import { create } from "zustand";

export const useProductStore = create((set, get) => ({
    listP: [],
    setProducts: (products) => set({ listP: products }),
}));

export const useCartStore = create((set, get) => ({
    cart: [],
    count: () => {
        const { cart } = get();
        if (cart.length) return cart.map((item) => item.count).reduce((prev, curr) => prev + curr);
        return 0;
    },
    add: (product) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart);
        set({ cart: updatedCart });
    },
    remove: (idProduct) => {
        const { cart } = get();
        const updatedCart = removeCart(idProduct, cart);
        set({ cart: updatedCart });
    },
    removeAll: () => set({ cart: [] }),
}));

function updateCart(product, cart) {
    const cartItem = { ...product, count: 1 };

    const productOnCart = cart.map((item) => item.id).includes(product.id);

    if (!productOnCart) cart.push(cartItem);
    else {
        return cart.map((item) => {
            if (item.id === product.id) return { ...item, count: item.count + 1 };
            return item;
        });
    }

    return cart;
}

function removeCart(idProduct, cart) {
    return cart
        .map((item) => {
            if (item.id === idProduct) return { ...item, count: item.count - 1 };
            return item;
        })
        .filter((item) => {
            return item.count;
        });
}
