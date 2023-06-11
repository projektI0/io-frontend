import {Tag} from "../map/types/types";

export type Product = {
    id: number;
    name: string;
    description: string;
};

export type Recipe = {
    id: number
    name: string
    description: string
    ingredients: Product[]
    tags: Tag[]
}

export type ProductWithTags = {
    product: Product;
    tags: Tag[];
}

export type ShoppingListProduct = {
    product: ProductWithTags
    quantity: number;
    crossedOut: boolean;
}

export type ShoppingListProductDTO = {
    shoppingListId: number,
    productId: number,
    quantity: number,
    crossedOut: boolean,
}