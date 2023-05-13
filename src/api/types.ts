import { Product, ShoppingListProductDTO } from "../components/products/types"

export type GetShoppingListProducts = {
    shoppingListId: number
}

export type AddShoppingListProduct = {
    shoppingListId: number
    product: ShoppingListProductDTO
}

export type UpdateShoppingListProduct = {
    shoppingListId: number,
    productId: number,
    updatedProduct: ShoppingListProductDTO
}

export type DeleteShoppingListProduct = {
    shoppingListId: number,
    productId: number
}

export type GetProductsWithFilter = {
    query: string,
    tags: number[],
}

export type FilteredProducts = {
    data: Product[],
    count: number
}

export type GetShoppingList = {
    shoppingListId: number
}

export type AddNewShoppingList = {
    name: string
}

export type UpdateShoppingList = {
    shoppingListId: number,
    newName: string
}

export type DeleteShoppingList = {
    shoppingListId: number
}