import "./css/productGrid.scss";
import React, { useState, useRef, useEffect } from "react";
import { Products } from "./Products.jsx";
import { useProducts } from "../hooks/useProducts.js";

function useSearch() {
    const [error, setError] = useState(null);
    const [searchVal, setSearchVal] = useState(() => {
        const searchInputValueFromStorage = window.localStorage.getItem("searchValue");
        if (searchInputValueFromStorage) {
            return searchInputValueFromStorage;
        } else {
            return "";
        }
    });
    const isFirstInput = useRef(true);

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = searchVal === "";
            return;
        }

        if (searchVal === "") {
            setError("no se puede buscar una pelicula vacia");
            return;
        }

        setError(null);
    }, [searchVal]);

    return { searchVal, setSearchVal, error };
}

const ProductsGrid = () => {
    const { searchVal, setSearchVal, error } = useSearch();
    const { products } = useProducts();
    const [paginationLimit, setPaginationLimit] = useState(6);
    const [pageCount, setPageCount] = useState(Math.ceil(products.length / paginationLimit));

    const [currentPage, setCurrentPage] = useState(() => {
        const currentPageFromStorage = window.localStorage.getItem("currentPage");
        if (currentPageFromStorage && currentPageFromStorage <= pageCount) {
            return currentPageFromStorage;
        } else {
            return 1;
        }
    });

    const prevRange = (currentPage - 1) * paginationLimit;
    const currRange = currentPage * paginationLimit;

    const handlePrevButtonOnClick = () => {
        setCurrentPage(currentPage - 1);
        window.localStorage.setItem("currentPage", currentPage - 1);
    };

    const handleNextButtonOnClick = () => {
        setCurrentPage(currentPage + 1);
        window.localStorage.setItem("currentPage", currentPage + 1);
    };

    const handleNumberButtonOnClick = (event) => {
        setCurrentPage(Number(event.target.innerText));
        window.localStorage.setItem("currentPage", Number(event.target.innerText));
    };

    const handleInput = (event) => {
        const newQuery = event.target.value;
        setSearchVal(newQuery);

        // let inputValue = event.target.value;
        // setSearchVal(inputValue);
        // window.localStorage.setItem("searchValue", inputValue);

        // let newProducts = [...products];

        // if (inputValue) {
        //     newProducts = initialProducts.filter((product) => {
        //         let searchValCopy = inputValue.toUpperCase();
        //         return product.title.includes(searchValCopy);
        //     });

        //     setPageCount(Math.ceil(newProducts.length / paginationLimit));
        //     // setProducts(newProducts);
        // } else {
        //     // setProducts(initialProducts);
        //     setPageCount(Math.ceil(initialProducts.length / paginationLimit));
        // }

        // setCurrentPage(1);
    };

    const nextButtonClassName = pageCount === currentPage ? "pagination-button disabled" : "pagination-button";
    const nextButtonDisabled = pageCount === currentPage;

    const indicesToRemove = [];
    const newProducts = [...products];

    products.forEach((item, index) => {
        if (index >= prevRange && index < currRange) {
        } else {
            indicesToRemove.push(index);
        }
    });

    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
        newProducts.splice(indicesToRemove[i], 1);
    }

    const paginationContainerClassName = products.length > 0 ? "pagination-container" : "pagination-container hide";

    const getPaginationNumbers = () => {
        let pageNumbers = [];

        for (let index = 1; index <= pageCount; index++) {
            let paginationButtonClassName = currentPage == index ? "pagination-number active" : "pagination-number";

            pageNumbers.push(
                <button
                    key={index}
                    className={paginationButtonClassName}
                    page-index={index}
                    aria-label={`Page ${index}`}
                    onClick={handleNumberButtonOnClick}
                >
                    {index}
                </button>
            );
        }

        return pageNumbers;
    };

    let pageNumbers = getPaginationNumbers();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchVal);
    };

    return (
        <>
            <section className="products-section">
                <span className="heading_container heading_center">
                    <h2>Products</h2>
                </span>
                <form className="search-wrapper" onSubmit={handleSubmit}>
                    <div className="input-group search-input-group">
                        <label htmlFor="search">Product:</label>
                        <input
                            name="query"
                            type="search"
                            id="search"
                            className="search-input"
                            placeholder="product name"
                            maxLength="80"
                            value={searchVal}
                            onChange={handleInput}
                        />
                        <button type="submit">Search</button>
                    </div>
                    {/* <div className="input-group show-input-group">
                        <label htmlFor="show">Show:</label>
                        <select id="show" className="show-select">
                            <option value="9">9</option>
                            <option value="18">18</option>
                            <option value="27">27</option>
                        </select>
                    </div> */}
                </form>
                {error && <p className="error">{error}</p>}
                <Products products={products}></Products>
            </section>
        </>
    );
};

export default ProductsGrid;
