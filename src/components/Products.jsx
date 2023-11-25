import ProductCard from "./ProductCard.jsx";

function ListOfProducts({ products }) {
    // const prevButtonClassName = currentPage === 1 ? "pagination-button disabled" : "pagination-button";
    // const prevButtonDisabled = currentPage === 1;
    return (
        <>
            <div className="grid-layout product-detail-container">
                {products.map(({ id, image, title, price }) => (
                    <ProductCard key={id} id={id.toString()} image={image.src} title={title} price={price.toString()} />
                ))}
            </div>
            {/* <div className="pagination-container">
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
            </div> */}
        </>
    );
}

function NoMoviesResults() {
    return (
        <div className="no-results-container">
            <h1>Nothing Found</h1>
            <p>
                Sorry, but nothing matched your search. <br />
                Please try again with some different keywords.
            </p>
        </div>
    );
}

export function Products({ products }) {
    const hasProducts = products.length > 0;
    return hasProducts ? <ListOfProducts products={products}></ListOfProducts> : <NoMoviesResults></NoMoviesResults>;
}
