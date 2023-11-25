import { response } from "../services/fakeStore.ts";

export function useProducts() {
    const products = response;

    const mappedProducts = products?.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating,
        size: product.size,
        price: product.price,
    }));

    return { products: mappedProducts };
}
