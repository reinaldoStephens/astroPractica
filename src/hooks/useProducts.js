import { useState, useRef } from "react";
import { searchProducts } from "../services/products.js";

export function useProducts({ searchVal }) {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const getProducts = () => {
        try {
            // setLoading(true);
            // setError(null);
            // TODO: aca se debe de hacer el fetch al API
            const newProducts = searchProducts({ searchVal });
            setProducts(newProducts);
        } catch (error) {
        } finally {
            // setLoading(false);
        }
    };

    return { products, getProducts };
}
