import type { Product, APIFakeStoreProductsResponse } from "../types/api";
import redBerryImg from "../img/products/redBerry.webp";
import powerBlackImg from "../img/products/powerBlack.webp";
import crystalGlossImg from "../img/products/crystalGloss.webp";
import pinkRoseImg from "../img/products/pinkRose.webp";
import jaianImg from "../img/products/jaian.webp";

export const response = [
    {
        id: "red-berry-womens-rain-boots",
        title: "RED BERRY RAINKERS WOMEN'S RAIN BOOTS",
        price: 76,
        description:
            "Meet your 365 days boot! Comfortable and functional, yet stylish, our Rainkers are the perfect match for your day-to-day activities.",
        category: "boot",
        image: redBerryImg,
        rating: { rate: 4.7, count: 130 },
        size: ["36", "37", "38", "39", "40", "41", "42"],
    },
    {
        id: "uc-white-womens-sneakers",
        title: "JA - IAN WOMEN'S SNEAKERS",
        price: 72,
        description:
            "Meet your new essential shoe! Comfortable and functional, yet stylish, our Sneakers are the perfect match for your day-to-day activities.",
        category: "sneaker",
        image: jaianImg,
        rating: { rate: 4.7, count: 130 },
        size: ["36", "37", "38", "39", "40"],
    },
    {
        id: "power-black-rainkers-womens-rain-boots",
        title: "POWER BLACK RAINKERS WOMEN'S RAIN BOOTS",
        price: 71,
        description:
            "Las botas impermeables Rainkers son la combinación perfecta de comodidad y estilo. Con su diseño elegante y negro, son el complemento perfecto para cualquier atuendo. Además, su exterior impermeable te mantendrá los pies secos y cómodos, sin importar el clima.",
        category: "boots",
        image: powerBlackImg,
        rating: { rate: 4.7, count: 130 },
        size: ["38", "39", "40", "41", "42"],
    },
    {
        id: "crystal-gloss-rainkers-womens-rain-boots",
        title: "CRYSTAL GLOSS RAINKERS WOMEN'S RAIN BOOTS",
        price: 81,
        description:
            "Whether you're navigating city streets or exploring the great outdoors, our Rainkers provide the support and traction you need to conquer any terrain. The comfortable cushioning ensures all-day comfort, while the stylish, transparent design keeps you looking your best.",
        image: crystalGlossImg,
        rating: { rate: 4.7, count: 130 },
        size: ["38", "39", "40"],
    },
    {
        id: "pink-rose-rainkers-womens-rain-boots",
        title: "PINK ROSÉ RAINKERS WOMEN'S RAIN BOOTS",
        price: 71,
        description:
            "Experience the perfect blend of style and function with our pink Rainkers. Order your pair today and step out in confidence, rain or shine.",
        image: pinkRoseImg,
        rating: { rate: 4.7, count: 130 },
        size: ["39"],
    },
    // {
    //     id: 6,
    //     title: "RED BERRY RAINKERS WOMEN'S RAIN BOOTS",
    //     price: 76,
    //     description:
    //         "Meet your 365 days boot! Comfortable and functional, yet stylish, our Rainkers are the perfect match for your day-to-day activities.",
    //     category: "boot",
    //     image: redBerryImg,
    //     rating: { rate: 4.7, count: 130 },
    //     size: ["36", "37", "38", "39", "40", "41", "42"],
    // },
    // {
    //     id: 7,
    //     title: "RED BERRY RAINKERS WOMEN'S RAIN BOOTS",
    //     price: 76,
    //     description:
    //         "Meet your 365 days boot! Comfortable and functional, yet stylish, our Rainkers are the perfect match for your day-to-day activities.",
    //     category: "boot",
    //     image: redBerryImg,
    //     rating: { rate: 4.7, count: 130 },
    //     size: ["36", "37", "38", "39", "40", "41", "42"],
    // },
    // {
    //     id: 8,
    //     title: "RED BERRY RAINKERS WOMEN'S RAIN BOOTS",
    //     price: 76,
    //     description:
    //         "Meet your 365 days boot! Comfortable and functional, yet stylish, our Rainkers are the perfect match for your day-to-day activities.",
    //     category: "boot",
    //     image: redBerryImg,
    //     rating: { rate: 4.7, count: 130 },
    //     size: ["36", "37", "38", "39", "40", "41", "42"],
    // },
    // {
    //     id: 9,
    //     title: "RED RAINKERS WOMEN'S RAIN BOOTS",
    //     price: 76,
    //     description:
    //         "Meet your 365 days boot! Comfortable and functional, yet stylish, our Rainkers are the perfect match for your day-to-day activities.",
    //     category: "boot",
    //     image: redBerryImg,
    //     rating: { rate: 4.7, count: 130 },
    //     size: ["36", "37", "38", "39", "40", "41", "42"],
    // },
];

function filterById(response: any[], id: any) {
    return response.filter(function (response) {
        return response["id"] == id;
    })[0];
}

export const getProductBy = ({ id }: { id: string }) => {
    const product = filterById(response, id) as Product;
    return product;
};

export const getLatestProducts = () => {
    const products = response as APIFakeStoreProductsResponse;
    return products;
};

// export const getProductBy = async ({ id }: { id: string }) => {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`);
//     const product = (await response.json()) as Product;
//     return product;
// };

// export const getLatestProducts = async () => {
//     const response = await fetch("https://fakestoreapi.com/products?limit=50", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     const products = (await response.json()) as APIFakeStoreProductsResponse;
//     return products;
// };
