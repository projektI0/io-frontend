import {api} from "./api";

export const apiListItems = api.injectEndpoints({
    endpoints: (builder) => ({
        getShoppingListItems: builder.query({
            query: (id) => `/shopping-lists/${id}/view`,
        }),
    }),
});

export const {
    useGetShoppingListItemsQuery
} = apiListItems;