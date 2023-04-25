import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {authHeader} from "../components/auth/AuthService";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
        prepareHeaders: (headers) => {
            headers.set('Authorization', authHeader());
            return headers;
        }
    }),
    tagTypes: ['ShoppingLists', 'ProductList', 'ActiveShoppingList'],
    endpoints: () => ({})
})