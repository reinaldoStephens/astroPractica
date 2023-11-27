import { response } from "../services/fakeStore.ts";

const mapProducts = (products) => {
    return products?.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating,
        size: product.size,
        price: product.price,
    }));
};

// TO DO: hacerlo async cuando es un fetch real
export const searchProducts = ({ searchVal }) => {
    if (searchVal === "") {
        return mapProducts(response);
    }

    try {
        searchVal = searchVal.toUpperCase();

        const newProducts = response.filter((product) => {
            return product.title.includes(searchVal);
        });

        return mapProducts(newProducts);
    } catch (error) {
        throw new Error("Error al cargar productos");
    }
};
