import type { Product, APIFakeStoreProductsResponse } from "../types/api";

export const getProductBy = async ({ id }: { id: string }) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = (await response.json()) as Product;
    return product;
};

export const getLatestProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products?limit=50", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const products = (await response.json()) as APIFakeStoreProductsResponse;
    return products;
};
