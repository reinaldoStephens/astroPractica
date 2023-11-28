import "./css/Cart.scss";

import { useId } from "react";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./Icons.jsx";

export function Cart() {
    const cartCheckboxId = useId();

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />
            <aside className="cart">
                <ul className="cart-item-list">
                    <li>
                        <img
                            src="data:image/jpeg;base64,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"
                            alt="Iphone"
                        />
                        <div>
                            <strong>iPhone</strong> - $1498
                        </div>
                        <footer>
                            <small>Qty: 1</small>
                            <button>+</button>
                        </footer>
                    </li>
                </ul>

                <button>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    );
}
