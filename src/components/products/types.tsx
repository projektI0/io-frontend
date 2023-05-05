import {Tag} from "../map/types/types";

export type Product = {
    id: number;
    name: string;
    description: string;
};

export type ProductWithTags = {
    product: Product;
    tags: Tag[];
}

export type ShoppingListProduct = {
    product: ProductWithTags
    quantity: number;
}

export type ShoppingListProductDTO = {
    shoppingListId: number,
    productId: number,
    quantity: number
}