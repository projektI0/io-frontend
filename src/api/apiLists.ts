import {api} from "./api";
import {ShoppingList} from "../components/lists/types";
import { AddNewShoppingList, DeleteShoppingList, GetShoppingList, UpdateShoppingList } from "./types";

export const apiLists = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserShoppingLists: builder.query<ShoppingList[],void>({
            query: () => ({
                url: '/shopping-lists/my',
                method: 'GET',
            }),
            providesTags: ['ShoppingLists'],
        }),
        getShoppingList: builder.query<ShoppingList, GetShoppingList>({
            query: (args) => ({
                url: `/shopping-lists/${args.shoppingListId}`,
                method: 'GET',
            }),
            providesTags: ['ShoppingLists'],
        }),
        addNewShoppingList: builder.mutation<ShoppingList, AddNewShoppingList>({
            query: (args) => ({
                url: '/shopping-lists/',
                method: 'POST',
                body: args.name,
            }),
            invalidatesTags: ['ShoppingLists'],
        }),
        updateShoppingList: builder.mutation<void, UpdateShoppingList>({
            query: (args) => {
                return {
                    url: `/shopping-lists/${args.shoppingListId}`,
                    method: 'PUT',
                    body: args.newName,
                }
            },
            invalidatesTags: ['ShoppingLists'],
        }),
        deleteShoppingList: builder.mutation<void, DeleteShoppingList>({
            query: (args) => ({
                url: `/shopping-lists/${args.shoppingListId}`,
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