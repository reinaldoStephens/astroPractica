import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { searchProducts } from "../services/products.js";

export function useProducts({ sort, paginationLimit }) {
    const [products, setProducts] = useState([]);
    const previousSearch = useRef();
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const pageCount = Math.ceil(products.length / paginationLimit);
    const [currentPage, setCurrentPage] = useState(() => {
        const currentPageFromStorage = window.localStorage.getItem("currentPage");
        if (currentPageFromStorage && currentPageFromStorage <= pageCount) {
            return currentPageFromStorage;
        } else {
            return 1;
        }
    });
    const [pageNumbers, setPageNumbers] = useState([]);

    const getProducts = useCallback(({ searchVal }) => {
        if (searchVal === previousSearch.current) return;
        try {
            // setLoading(true);
            // setError(null);
            // TODO: aca se debe de hacer el fetch al API
            previousSearch.current = searchVal;
            const newProducts = searchProducts({ searchVal });
            setProducts(newProducts);
            setCurrentPage(1);
        } catch (error) {
        } finally {
            // setLoading(false);
        }
    }, []);

    const getSortedProducts = () => {
        if (products) {
            if (sort === "nombre") {
                return [...products].sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                });
            } else if (sort === "precio") {
                return [...products].sort(function (a, b) {
                    return a.price - b.price;
                });
            }
        }
    };

    const sortedProducts = useMemo(() => {
        let prevRange = (currentPage - 1) * paginationLimit;
        const currRange = currentPage * paginationLimit;

        let newSortedProducts = getSortedProducts();

        return newSortedProducts.filter((_, index) => {
            return index >= prevRange && index < currRange;
        });
    }, [sort, products, currentPage, paginationLimit]);

    useEffect(() => {
        const handleNumberButtonOnClick = (event) => {
            setCurrentPage(Number(event.target.innerText));
            window.localStorage.setItem("currentPage", Number(event.target.innerText));
        };
        const newNumbers = [];
        for (let index = 1; index <= pageCount; index++) {
            let paginationButtonClassName = currentPage == index ? "pagination-number active" : "pagination-number";
            newNumbers.push(
                <button
                    key={index}
                    className={paginationButtonClassName}
                    page-index={index}
                    aria-label={`Page ${index}`}
                    onClick={handleNumberButtonOnClick}
                    tabIndex={0}
                >
                    {index}
                </button>
            );
        }
        setPageNumbers(newNumbers);
    }, [products, paginationLimit, currentPage]);

    return { products: sortedProducts, getProducts, currentPage, pageCount, pageNumbers, setCurrentPage };
}
