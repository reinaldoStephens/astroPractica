import React, { useState } from "react";
import "./css/productCard.scss";

const ProductCard = ({ id, title, price, image }) => {
    return (
        <>
            <div key={id} className="box" id={id}>
                <a href={`/product/${id}`}>
                    <picture className="img-box">
                        <img
                            title={title}
                            src={image}
                            alt={`This is an image of the product called ${title}`}
                            loading="lazy"
                            decoding="async"
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
            </div>
        </>
    );
};

export default ProductCard;
