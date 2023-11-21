import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import "./css/productGrid.scss";

const ProductsGrid = ({ initialProducts }) => {
    // const products = await getLatestProducts();
    const [products, setProducts] = useState(initialProducts);
    const [searchVal, setSearchVal] = useState("");
    const [paginationLimit, setPaginationLimit] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const prevRange = (currentPage - 1) * paginationLimit;
    const currRange = currentPage * paginationLimit;
    const indicesToRemove = [];
    const prevButtonClassName = currentPage === 1 ? "pagination-button disabled" : "pagination-button";
    const prevButtonDisabled = currentPage === 1;

    const handlePrevButtonOnClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextButtonOnClick = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleNumberButtonOnClick = (event) => {
        setCurrentPage(Number(event.target.innerText));
    };

    const handleInput = (event) => {
        setSearchVal(event.target.value);

        setProducts(initialProducts);
        setPageCount(Math.ceil(filteredProducts.length / paginationLimit));
    };

    const filteredProducts = products.filter((product) => {
        let searchValCopy = searchVal.toUpperCase();

        return product.title.includes(searchValCopy);
    });

    const [pageCount, setPageCount] = useState(Math.ceil(filteredProducts.length / paginationLimit));
    const nextButtonClassName = pageCount === currentPage ? "pagination-button disabled" : "pagination-button";
    const nextButtonDisabled = pageCount === currentPage;

    filteredProducts.forEach((item, index) => {
        if (index >= prevRange && index < currRange) {
        } else {
            indicesToRemove.push(index);
        }
    });

    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
        filteredProducts.splice(indicesToRemove[i], 1);
    }

    const noResultContainerClassName = filteredProducts.length > 0 ? "no-results-container hide" : "no-results-container";
    const paginationContainerClassName = filteredProducts.length > 0 ? "pagination-container" : "pagination-container hide";

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

    return (
        <>
            <section className="products-section">
                <header className="heading_container heading_center">
                    <h2>Latest Products</h2>
                </header>
                <div className="search-wrapper">
                    <div className="input-group search-input-group">
                        <label htmlFor="search">Search Products:</label>
                        <input
                            type="search"
                            id="search"
                            className="search-input"
                            maxLength="80"
                            value={searchVal}
                            onChange={handleInput}
                        />
                    </div>
                    {/* <div className="input-group show-input-group">
                        <label htmlFor="show">Show:</label>
                        <select id="show" className="show-select">
                            <option value="9">9</option>
                            <option value="18">18</option>
                            <option value="27">27</option>
                        </select>
                    </div> */}
                </div>
                <div className={noResultContainerClassName}>
                    <h1>Nothing Found</h1>
                    <p>
                        Sorry, but nothing matched your search. <br />
                        Please try again with some different keywords.
                    </p>
                </div>
                <div className="grid-layout product-detail-container">
                    {filteredProducts.map(({ id, image, title, price }) => (
                        <ProductCard key={id} id={id.toString()} image={image.src} title={title} price={price.toString()} />
                    ))}
                </div>
                <div className={paginationContainerClassName}>
                    <nav className="pagination-body">
                        <button
                            className={prevButtonClassName}
                            id="prev-button"
                            aria-label="Previous page"
                            title="Previous page"
                            disabled={prevButtonDisabled}
                            onClick={handlePrevButtonOnClick}
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
