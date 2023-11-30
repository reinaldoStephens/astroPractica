import { useCartStore } from "../store/cartStore.js";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";

export function ProductCartButton({ product }) {
    console.log("product", product);
    const { add, cart, remove, removeAll } = useCartStore((state) => state);

    const checkProductInCart = (productId) => {
        return cart.some((product) => {
            return product.id === productId;
        });
    };

    const isProductInCart = checkProductInCart(product.id);

    const handleRemoveProduct = () => {
        console.log("removiendo");
        remove(product.id);
    };

    const handleAddProduct = () => {
        console.log("agregando");
        add(product);
    };

    return (
        <>
            <div>
                <button
                    style={{ backgroundColor: isProductInCart ? "red" : "#09f" }}
                    onClick={() => {
                        isProductInCart ? handleRemoveProduct() : handleAddProduct();
                    }}
                >
                    {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
            </div>
        </>
    );
}
