import {api} from "./api";
import {ShoppingListView} from "../components/lists/types";
import type {
    AddShoppingListProduct,
    DeleteShoppingListProduct,
    FilteredProducts,
    GetProductsWithFilter,
    GetShoppingListProducts,
    UpdateShoppingListProduct
} from "./types";
import {Tag} from "../components/map/types/types";
import {Product, Recipe} from "../components/products/types";

export const apiProducts = api.injectEndpoints({
    endpoints: (builder) => ({
        getShoppingListWithProducts: builder.query<ShoppingListView, GetShoppingListProducts>({
            query: (args) => ({
                url: `/shopping-lists/${args.shoppingListId}/view`,
                method: 'GET',
            }),
            providesTags: ['ProductList', 'ActiveShoppingList'],
        }),
        addShoppingListProduct: builder.mutation<void, AddShoppingListProduct>({
            query: (args) => {
                return {
                    url: `/shopping-lists/${args.shoppingListId}/products/`,
                    method: 'POST',
                    body: args.product,
                }
            },
            invalidatesTags: ['ProductList']
        }),
        updateShoppingListProduct: builder.mutation<void, UpdateShoppingListProduct>({
            query: (args) => {
                return {
                    url: `/shopping-lists/${args.shoppingListId}/products/${args.productId}`,
                    method: 'PUT',
                    body: args.updatedProduct,
                }
            },
            invalidatesTags: ['ActiveShoppingList'],
        }),
        deleteShoppingListProduct: builder.mutation<void, DeleteShoppingListProduct>({
            query: (args) => {
                return {
                    url: `/shopping-lists/${args.shoppingListId}/products/${args.productId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['ProductList', 'ActiveShoppingList'],
        }),
        getAllTags: builder.query<Tag[], void>({
            query: () => ({
                url: `/tags`,
                method: 'GET',
            }),
            providesTags: ['ProductList'],
        }),
        getProductsWithFilter: builder.mutation<FilteredProducts, GetProductsWithFilter>({
            query: (args) => {
                return {
                    url: `/products/filter`,
                    method: 'POST',
                    body: args,
                }
            },
            invalidatesTags: ['ProductList']
        }),
        getAllProducts: builder.query<Product[], void>({
            query: () => ({
                url: `/products`,
                method: 'GET',
            })
        }),
        getRecipesWithFilter: builder.mutation<Recipe[], GetProductsWithFilter>({
            query: (args) => {
                return {
                    url: `/recipes/filter`,
                    method: 'POST',
                    body: args,
                }
            },
            invalidatesTags: ['ProductList']
        })
    }),
});

export const {
    useGetShoppingListWithProductsQuery,
    useAddShoppingListProductMutation,
    useUpdateShoppingListProductMutation,
    useDeleteShoppingListProductMutation,
    useGetAllTagsQuery,
    useGetProductsWithFilterMutation,
    useGetAllProductsQuery,
    useGetRecipesWithFilterMutation
} = apiProducts;