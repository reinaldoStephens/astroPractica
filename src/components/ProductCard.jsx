import React, { useState } from "react";

const ProductCard = ({ id, title, price, image }) => {
    return (
        <>
            <li key={id} className="box" id={id}>
                <a
                    href={`/products/${id}`}
                    tabIndex="0"
                    aria-label={`This is an link to go to the product called ${title}`}
                    rel="noopener noreferrer"
                >
                    <picture className="img-box">
                        <img
                            title={title}
                            src={image}
                            alt={`Product ${title}`}
                            loading="lazy"
                            decoding="async"
                            aria-label={`Product ${title}`}
                        />
                    </picture>
                    <div className="detail-box">
                        <h6 className="product-title">{title}</h6>
                        <h6 className="product-price">
                            Price
                            <span> ${price}</span>
                        </h6>
                    </div>
                    <div className="new">
                        <span>New</span>
                    </div>
                </a>
            </li>
        </>
    );
};

export default ProductCard;
