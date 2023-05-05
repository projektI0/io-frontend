import {api} from "./api";
import {ShoppingListProduct, ShoppingListProductDTO} from "../components/products/types";
import {ShoppingListView} from "../components/lists/types";

export const apiProducts = api.injectEndpoints({
    endpoints: (builder) => ({
        getShoppingListWithProducts: builder.query<ShoppingListView, number>({
            query: (id) => ({
                url: `/shopping-lists/${id}/view`,
                method: 'GET',
            }),
            providesTags: ['ProductList', 'ActiveShoppingList'],
        }),
        addShoppingListProduct: builder.mutation<ShoppingListProduct, {
            id: number,
            payload: ShoppingListProductDTO
        }>({
            query: (args) => {
                const {id, payload} = args
                return {
                    url: `/shopping-lists/${id}/products/`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['ProductList']
        }),
        updateShoppingListProduct: builder.mutation({
            query: (args) => {
                const {listId, productId, payload} = args
                return {
                    url: `/shopping-lists/${listId}/products/${productId}`,
                    method: 'PUT',
                    body: payload,
                }
            }
        }),
        deleteShoppingListProduct: builder.mutation({
            query: (args) => {
                const {listId, productId} = args
                return {
                    url: `/shopping-lists/${listId}/products/${productId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['ProductList', 'ActiveShoppingList'],
        })
    }),
});

export const {
    useGetShoppingListWithProductsQuery,
    useAddShoppingListProductMutation,
    useUpdateShoppingListProductMutation,
    useDeleteShoppingListProductMutation
} = apiProducts;