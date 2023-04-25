import {ShoppingListProduct} from "../products/types";

export type ShoppingList = {
    id: number;
    name: string;
    ownerId: number;
    createdAt: Date;
};

export type ShoppingListView = {
    shoppingListDTO: ShoppingList;
    products: ShoppingListProduct[]
}