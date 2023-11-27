import React, { useRef, useState, useEffect, useCallback } from "react";
import { Products } from "./Products.jsx";
import { useProducts } from "../hooks/useProducts.jsx";
import debounce from "just-debounce-it";

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

        setError(null);
    }, [searchVal]);

    return { searchVal, setSearchVal, error };
}

const ProductsGrid = () => {
    const sortOptions = [
        { value: "nombre", label: "Nombre" },
        { value: "precio", label: "Precio" },
    ];
    const showOptions = [
        { value: "4", label: "4" },
        { value: "8", label: "8" },
    ];
    const [paginationLimit, setPaginationLimit] = useState(showOptions[0].value);
    const [sort, setSort] = useState(sortOptions[0].value);
    const { searchVal, setSearchVal, error } = useSearch();
    const { products, getProducts, currentPage, pageCount, pageNumbers, setCurrentPage } = useProducts({
        sort,
        paginationLimit,
    });
    const paginationContainerClassName = products.length > 0 ? "pagination-container" : "pagination-container hide";
    const prevButtonDisabled = currentPage === 1;
    const prevButtonClassName = prevButtonDisabled ? "pagination-button disabled" : "pagination-button";
    const nextButtonDisabled = pageCount === currentPage;
    const nextButtonClassName = nextButtonDisabled ? "pagination-button disabled" : "pagination-button";

    const debouncedGetProducts = useCallback(
        debounce((searchVal) => {
            getProducts({ searchVal });
        }, 500),
        []
    );

    useEffect(() => {
        if (products && products.length === 0) {
            getProducts({ searchVal });
        }
    }, []);

    const handleSort = (event) => {
        const value = event.target.value;
        setSort(value);
    };

    const handlePaginationLimit = (event) => {
        const value = event.target.value;
        setPaginationLimit(value);
        setCurrentPage(1);
    };

    const handleInput = (event) => {
        const newQuery = event.target.value;
        setSearchVal(newQuery);
        debouncedGetProducts(newQuery);
        window.localStorage.setItem("searchValue", newQuery);
    };

    const handlePrevButtonOnClick = () => {
        setCurrentPage(currentPage - 1);
        window.localStorage.setItem("currentPage", currentPage - 1);
    };

    const handleNextButtonOnClick = () => {
        setCurrentPage(currentPage + 1);
        window.localStorage.setItem("currentPage", currentPage + 1);
    };

    return (
        <>
            <section className="products-section">
                <span className="heading_container heading_center">
                    <h2>Products</h2>
                </span>
                <form className="search-wrapper">
                    <div className="input-group search-input-group">
                        <input
                            name="query"
                            type="search"
                            id="search"
                            className="search-input"
                            placeholder="Product name"
                            maxLength="80"
                            value={searchVal}
                            onChange={handleInput}
                            title="Search product by name"
                        />
                    </div>
                    <div className="input-group show-input-group">
                        <label htmlFor="sort">Sort by</label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={handleSort}
                            name="select"
                            tabIndex="0"
                            role="combobox"
                            label="Choose an option"
                            title="Choose an option"
                            className="sort-select"
                        >
                            {sortOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group show-input-group">
                        <label htmlFor="show">Show</label>
                        <select id="show" className="show-select" tabIndex="0" onChange={handlePaginationLimit}>
                            {showOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
                {error && <p className="error">{error}</p>}
                <Products products={products}></Products>
                <div className={paginationContainerClassName}>
                    <nav className="pagination-body">
                        <button
                            className={prevButtonClassName}
                            id="prev-button"
                            aria-label="Previous page"
                            title="Previous page"
                            disabled={prevButtonDisabled}
                            onClick={handlePrevButtonOnClick}
                            tabIndex="0"
                        >
                            {" "}
                            &lt;
                        </button>
                        <div id="pagination-numbers">{pageNumbers}</div>

                        <button
                            className={nextButtonClassName}
                            id="next-button"
                            aria-label="Next page"
                            title="Next page"
                            disabled={nextButtonDisabled}
                            onClick={handleNextButtonOnClick}
                            tabIndex="0"
                        >
                            {" "}
                            &gt;
                        </button>
                    </nav>
                </div>
            </section>
        </>
    );
};

export default ProductsGrid;
