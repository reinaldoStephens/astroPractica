import { useId, useState } from "react";
import { ClearCartIcon, CloseCartIcon, CartIcon, MinusIcon, PlusIcon } from "./Icons.jsx";
import { useCartStore } from "../store/cartStore.js";

export function Cart() {
    const { add, cart, remove, removeAll } = useCartStore((state) => state);
    const [showCart, setShowCart] = useState(false);

    const cartCheckboxId = useId();
    const cartLength = cart?.length || 0;

    const listItems = [];
    let subtotal = 0;
    cart.forEach((product, index) => {
        subtotal += product.price * product.count;
        listItems.push(
            <li key={`${product.id}-${product.size}-${index}`}>
                <div className="up-details">
                    <img src={product.image.src} alt="" loading="lazy" />
                    <div className="item-details">
                        <div className="price-container">
                            <span className="dollar">US$</span>
                            <span className="price">{product.price}</span>
                        </div>

                        <span className="size">
                            <small>Size: {product.size}</small>
                        </span>
                        <div className="quantity-container">
                            <button
                                title="Remove"
                                aria-label="Remove a product"
                                className="minus-icon"
                                onClick={() => handleRemoveProduct(product.id, product.size)}
                            >
                                <MinusIcon></MinusIcon>
                            </button>
                            <small>{product.count}</small>
                            <button
                                title="Add"
                                aria-label="Add a product"
                                className="plus-icon"
                                onClick={() => handleAddProduct(product.id, product.size)}
                            >
                                <PlusIcon></PlusIcon>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="item-title">
                    <strong>{product.title}</strong>
                </div>
            </li>
        );
    });

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
            <label tabIndex="0" title="Open cart" aria-label="Open cart Icon" className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon /> {cartLength}
            </label>
            <input tab-index="0" id={cartCheckboxId} type="checkbox" onChange={handleShowCart} checked={isChecked} hidden />
            <aside className="cart">
                <div className="cart-header-container">
                    <h2 className="cart-header">Your cart</h2>
                    <div className="close-icon-container">
                        <button title="Close" aria-label="Close cart button" type="button" onClick={handleShowCart}>
                            <span className="sr-only">Close panel</span>
                            <CloseCartIcon />
                        </button>
                    </div>
                </div>

                {cart.length > 0 && <ul className="cart-list">{listItems}</ul>}

                {cartLength <= 0 && (
                    <div className="cart-empty">
                        <p>Your cart is empty</p>
                        <a href="/products" rel="noopener noreferrer">
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="cart-footer-container">
                        <div className="cart-subtotal">
                            <p>Subtotal</p>
                            <p>${subtotal}</p>
                        </div>
                        <small>Shipping and taxes calculated at checkout.</small>
                        <a
                            title="Checkout cart link"
                            aria-label="Checkout cart link"
                            href="/"
                            className="checkout-cart-button"
                            rel="noopener noreferrer"
                        >
                            Checkout
                        </a>
                    </div>
                )}

                {cart.length > 0 && (
                    <button
                        className="clear-cart"
                        onClick={handleClearCart}
                        title="Clear cart button"
                        aria-label="Clear cart button"
                    >
                        <span>Clear cart</span>
                        <ClearCartIcon />
                    </button>
                )}
            </aside>
        </>
    );
}
