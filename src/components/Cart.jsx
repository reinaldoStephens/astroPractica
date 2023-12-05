import { useId } from "react";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./Icons.jsx";
import { useCartStore } from "../store/cartStore.js";

export function Cart() {
    const { add, cart, remove, removeAll } = useCartStore((state) => state);

    const cartCheckboxId = useId();
    const countTest = cart?.length || 0;

    const handleRemoveProduct = () => {
        remove(product.id);
    };

    const handleAddProduct = (productId) => {
        let productToAdd = cart.find((cartProduct) => {
            return cartProduct.id === productId;
        });

        add(productToAdd);
    };

    const handleClearCart = () => {
        removeAll();
    };
    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon /> {countTest}
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />
            <aside className="cart">
                <ul className="cart-item-list">
                    {cart.length ? (
                        cart.map((product, index) => (
                            <li key={product.id}>
                                <img src={product.image.src} alt="Iphone" />
                                <div>
                                    <strong>{product.title}</strong> - ${product.price}
                                </div>
                                <footer>
                                    <small>Qty: {product.count}</small>
                                    <button onClick={() => handleAddProduct(product.id)}>+</button>
                                </footer>
                            </li>
                        ))
                    ) : (
                        <li>No Data</li>
                    )}
                </ul>

                <button onClick={handleClearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    );
}
