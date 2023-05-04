import {api} from "./api";

export const apiLists = api.injectEndpoints({
    endpoints: (builder) => ({
        getShoppingLists: builder.query({
            query: () => ({
                url: '/shopping-lists/my',
                method: 'GET',
            }),
            providesTags: ['ShoppingLists'],
        }),
        addNewShoppingList: builder.mutation({
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
    useGetShoppingListsQuery,
    useAddNewShoppingListMutation,
    useUpdateShoppingListMutation,
    useDeleteShoppingListMutation,
} = apiLists;