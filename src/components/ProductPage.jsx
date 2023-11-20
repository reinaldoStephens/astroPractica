import React, { useState } from "react";
import "./css/productPage.css";

const ProductPage = ({ image, title, description }) => {
    const figureStyle = {
        backgroundImage: `url(${image.src}`,
    };

    return (
        <>
            <article>
                <figure className="zoom" style={figureStyle}>
                    <img width="570" height="570" src={image.src} alt={title} loading="lazy" decoding="async" />{" "}
                </figure>

                <h2>{title}</h2>
                <p>{description}</p>
            </article>
        </>
    );
};

export default ProductPage;
