import { useId, useState } from "react";
import { ClearCartIcon, RemoveFromCartIcon, CloseCartIcon, CartIcon } from "./Icons.jsx";
import { useCartStore } from "../store/cartStore.js";

export function Cart() {
    const { add, cart, remove, removeAll } = useCartStore((state) => state);

    const [showCart, setShowCart] = useState(false);

    const cartCheckboxId = useId();
    const countTest = cart?.length || 0;

    const handleRemoveProduct = (productId, productSize) => {
        let productToRemove = cart.find((cartProduct) => {
            return cartProduct.id === productId && cartProduct.size === productSize;
        });
        remove(productToRemove.id, productToRemove.size, false);
    };

    const handleAddProduct = (productId, productSize) => {
        let productToAdd = cart.find((cartProduct) => {
            return cartProduct.id === productId && cartProduct.size === productSize;
        });

        add(productToAdd, productToAdd.size);
    };

    const handleClearCart = () => {
        removeAll();
    };

    const handleShowCart = () => {
        setShowCart(!showCart);
    };

    const isChecked = showCart;

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon /> {countTest}
            </label>
            <input id={cartCheckboxId} type="checkbox" onChange={handleShowCart} checked={isChecked} hidden />
            <aside className="cart">
                <div className="cart-header-container">
                    <h2 className="cart-header">Your cart</h2>
                    <div className="close-icon-container">
                        <button type="button" onClick={handleShowCart}>
                            <span className="sr-only">Close panel</span>
                            <CloseCartIcon />
                        </button>
                    </div>
                </div>

                <ul className="cart-item-list">
                    {cart.length ? (
                        cart.map((product, index) => (
                            <li key={`${product.id}-${product.size}-${index}`}>
                                <img src={product.image.src} alt="Iphone" />
                                <div>
                                    <strong>{product.title}</strong> - ${product.price}
                                </div>
                                <div>Size: {product.size}</div>
                                <footer>
                                    <small>Qty: {product.count}</small>
                                    <button onClick={() => handleRemoveProduct(product.id, product.size)}>-</button>
                                    <button onClick={() => handleAddProduct(product.id, product.size)}>+</button>
                                </footer>
                            </li>
                        ))
                    ) : (
                        <li>
                            <div className="cart-empty">
                                <p>Your cart is empty</p>
                                <a href="/products">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>
                        </li>
                    )}
                </ul>
                {cart.length ? (
                    <button onClick={handleClearCart}>
                        <ClearCartIcon />
                    </button>
                ) : (
                    ""
                )}

                <div className="">
                    {cart.length ? (
                        <div className="cart-footer-container">
                            <div className="cart-subtotal">
                                <p>Subtotal</p>
                                <p>
                                    $555
                                    {/* <Money price={$cart.cost.subtotalAmount} showCurrency={true} /> */}
                                </p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <a href="/" className="button">
                                    Checkout
                                </a>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </aside>
        </>
    );
}
