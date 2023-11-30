import "./css/Cart.scss";

import { useId } from "react";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./Icons.jsx";
import { useCartStore } from "../store/cartStore.js";

export function Cart() {
    const { add, cart, remove, removeAll } = useCartStore((state) => state);

    const cartCheckboxId = useId();
    const countTest = cart?.length || 0;

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
                                    <small>Qty: 1</small>
                                    <button>+</button>
                                </footer>
                            </li>
                        ))
                    ) : (
                        <li>No Data</li>
                    )}
                </ul>

                <button>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    );
}
