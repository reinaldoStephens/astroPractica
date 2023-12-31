import React, { useRef, useState, useEffect, useCallback, useId } from "react";
import { Products } from "./Products.jsx";
import { useProducts } from "../hooks/useProducts.jsx";
import debounce from "just-debounce-it";

function useSearch() {
    const [searchVal, setSearchVal] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        // if URL has search query,
        // insert that search query in input field
        const searchUrl = new URLSearchParams(window.location.search);
        const searchStr = searchUrl.get("q");
        if (searchStr) setSearchVal(searchStr);

        // put focus cursor at the end of the string
        setTimeout(function () {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = searchStr?.length || 0;
        }, 50);
    }, []);

    return { searchVal, setSearchVal, inputRef };
}

const ProductsGrid = ({ initialProducts }) => {
    const sortSelectId = useId();
    const showSelectId = useId();
    const sortOptions = [
        { value: "nombre", label: "Nombre" },
        { value: "precio", label: "Precio" },
    ];
    const showOptions = [
        { value: "4", label: "4" },
        { value: "8", label: "8" },
    ];
    const [loading, setLoading] = useState(true);
    const [paginationLimit, setPaginationLimit] = useState(showOptions[0].value);
    const [sort, setSort] = useState(sortOptions[0].value);
    const { searchVal, setSearchVal, inputRef } = useSearch();
    const { products, getProducts, currentPage, pageCount, pageNumbers, setCurrentPage } = useProducts({
        sort,
        paginationLimit,
        initialProducts,
        searchVal,
        setLoading,
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

    debouncedGetProducts(searchVal);

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
    };

    const handlePrevButtonOnClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextButtonOnClick = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <section className="products-section">
                <span className="heading_container heading_center">
                    <h2>Products</h2>
                </span>
                <form
                    className="search-wrapper"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
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
                            aria-label="Product name"
                            ref={inputRef}
                        />
                    </div>
                    <div className="input-group show-input-group">
                        <label htmlFor={sortSelectId}>Sort by</label>
                        <select
                            id={sortSelectId}
                            value={sort}
                            onChange={handleSort}
                            name="sortBy"
                            tabIndex="0"
                            title="Choose an option"
                            className="sort-select"
                            aria-label="Sort by"
                        >
                            {sortOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group show-input-group">
                        <label htmlFor={showSelectId}>Show</label>
                        <select
                            id={showSelectId}
                            value={paginationLimit}
                            name="show"
                            className="show-select"
                            tabIndex="0"
                            onChange={handlePaginationLimit}
                            aria-label="Show"
                            title="Choose an option"
                        >
                            {showOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
                {loading ? (
                    <div className="loading-state">
                        <div className="loading"></div>
                    </div>
                ) : (
                    <Products products={products}></Products>
                )}

                {loading ? (
                    ""
                ) : (
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
                )}
            </section>
        </>
    );
};

export default ProductsGrid;
