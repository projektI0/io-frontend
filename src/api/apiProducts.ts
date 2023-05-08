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
                const {listId, productId, quantity} = args
                return {
                    url: `/shopping-lists/${listId}/products/${productId}`,
                    method: 'PUT',
                    body: quantity,
                }
            },
            invalidatesTags: ['ActiveShoppingList'],
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
        }),
        getAllTags: builder.query({
            query: () => ({
                url: `/tags`,
                method: 'GET',
            }),
            providesTags: ['ProductList'],
        }),
        getProductsWithFilter: builder.mutation({
            query: (payload) => {
                return {
                    url: `/products/filter`,
                    method: 'POST',
                    body: payload,
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
    useGetProductsWithFilterMutation
} = apiProducts;