import { useCartStore } from "../store/cartStore.js";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";

import { useId, useState } from "react";

export function AddToCartForm({ product }) {
    const { add, cart, remove, removeAll } = useCartStore((state) => state);

    const productSizeId = useId();
    const [sizeSelected, setSizeSelected] = useState(product.size[0]);

    const allSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];
    const enableSizes = allSizes.filter((item) => product?.size.includes(item));

    const checkProductInCart = (productId) => {
        return cart.some((product) => {
            return product.id === productId && sizeSelected === product.size;
        });
    };

    const isProductInCart = checkProductInCart(product.id);

    const handleSizeChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setSizeSelected(value);
    };

    const handleRemoveProduct = (event) => {
        event.preventDefault();
        const size = event.target.elements.size.value;
        setSizeSelected(size);
        remove(product.id, size, true);
    };

    const handleAddProduct = (event) => {
        event.preventDefault();
        const size = event.target.elements.size.value;
        setSizeSelected(size);
        add(product, size);
    };

    const buttonClassName = isProductInCart ? "product-added" : "product-to-add";

    return (
        <>
            <form
                onSubmit={() => {
                    isProductInCart ? handleRemoveProduct(event) : handleAddProduct(event);
                }}
            >
                <div className="product-size-container">
                    <label htmlFor={productSizeId}>Size *</label>
                    <select
                        value={sizeSelected}
                        id={productSizeId}
                        className="size-select"
                        name="size"
                        onChange={handleSizeChange}
                        title="Choose a size"
                        aria-label="Select a shoe size"
                        tabIndex="0"
                    >
                        {allSizes.map((size) =>
                            enableSizes.indexOf(size) !== -1 ? (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ) : (
                                <option key={size} value={size} disabled>
                                    {size}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="cart-button-container">
                    <button className={buttonClassName} type="submit">
                        {isProductInCart ? (
                            <>
                                <span>Delete</span>
                                <RemoveFromCartIcon />
                            </>
                        ) : (
                            <>
                                <span>Add to cart</span>
                                <AddToCartIcon />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
