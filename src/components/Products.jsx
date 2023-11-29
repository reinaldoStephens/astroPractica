import ProductCard from "./ProductCard.jsx";

function ListOfProducts({ products }) {
    return (
        <>
            <ul className="grid-layout product-detail-container">
                {products.map(({ id, image, title, price }) => (
                    <ProductCard key={id} id={id.toString()} image={image.src} title={title} price={price.toString()} />
                ))}
            </ul>
        </>
    );
}

function NoProductsResults() {
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
    const hasProducts = products ? products.length > 0 : false;
    return hasProducts ? <ListOfProducts products={products}></ListOfProducts> : <NoProductsResults></NoProductsResults>;
}
