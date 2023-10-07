export type Product = {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    prompt: string;
    thumbnail: string;
    images: string[];
};

export type CreateProduct = {
    title : string,
    price : number
}
export interface GetProduct {
    id: string;
    title: string;
    description: string;
    brand: string;
    category: string;
    thumbnail: string;
    price : number 
}