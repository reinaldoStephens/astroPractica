import "../components/css/ProductCartButton.scss";
import { useCartStore } from "../store/cartStore.js";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";

export function ProductCartButton({ product }) {
    const { add, cart, remove, removeAll } = useCartStore((state) => state);

    const checkProductInCart = (productId) => {
        return cart.some((product) => {
            return product.id === productId;
        });
    };

    const isProductInCart = checkProductInCart(product.id);

    const handleRemoveProduct = () => {
        remove(product.id);
    };

    const handleAddProduct = () => {
        add(product);
    };

    const buttonClassName = isProductInCart ? "product-added" : "product-to-add";

    return (
        <>
            <div className="cart-button-container">
                <button
                    className={buttonClassName}
                    onClick={() => {
                        isProductInCart ? handleRemoveProduct() : handleAddProduct();
                    }}
                >
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
        </>
    );
}
