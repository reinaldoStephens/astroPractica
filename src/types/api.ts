export type APIFakeStoreProductsResponse = Product[];

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    image: any;
    rating: Rating;
};

export enum Category {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing",
}

export type Rating = {
    rate: number;
    count: number;
};
