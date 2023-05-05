import {api} from "./api";
import {ShoppingList} from "../components/lists/types";

export const apiLists = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserShoppingLists: builder.query({
            query: () => ({
                url: '/shopping-lists/my',
                method: 'GET',
            }),
            providesTags: ['ShoppingLists'],
        }),
        getShoppingList: builder.query({
            query: (id) => ({
                url: `/shopping-lists/${id}`,
                method: 'GET',
            }),
            providesTags: ['ShoppingLists'],
        }),
        addNewShoppingList: builder.mutation<ShoppingList, string>({
            query: (payload) => ({
                url: '/shopping-lists/',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['ShoppingLists'],
        }),
        updateShoppingList: builder.mutation({
            query: (args) => {
                const {id, payload} = args
                return {
                    url: `/shopping-lists/${id}`,
                    method: 'PUT',
                    body: payload,
                }
            },
            invalidatesTags: ['ShoppingLists'],
        }),
        deleteShoppingList: builder.mutation({
            query: (id) => ({
                url: `/shopping-lists/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ShoppingLists'],
        }),
    }),
});

export const {
    useGetUserShoppingListsQuery,
    useGetShoppingListQuery,
    useAddNewShoppingListMutation,
    useUpdateShoppingListMutation,
    useDeleteShoppingListMutation,
} = apiLists;