import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {authHeader} from "../components/auth/AuthService";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
        prepareHeaders: (headers) => {
            headers.set('Authorization', authHeader());
            return headers;
        }
    }),
    tagTypes: ['ShoppingLists'],
    endpoints: (builder) => ({
        getShoppingLists: builder.query({
            query: () => ({
                // url: '/shops',
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
            query: (payload) => ({
                url: `/shopping-lists/${payload.id}`,
                method: 'PUT',
                body: payload.body,
            }),
            invalidatesTags: ['ShoppingLists'],
        }),
        deleteShoppingList: builder.mutation({
            query: (id) => ({
                url: `/shopping-lists/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ShoppingLists'],
        }),
    })
})

export const {
    useGetShoppingListsQuery,
    useAddNewShoppingListMutation,
    useUpdateShoppingListMutation,
    useDeleteShoppingListMutation,
} = apiSlice