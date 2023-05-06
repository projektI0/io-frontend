import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {authHeader} from "../components/auth/AuthService";

const API_URL: string = import.meta.env.VITE_API_URL;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', authHeader());
            return headers;
        }
    }),
    tagTypes: ['ShoppingLists', 'ProductList', 'ActiveShoppingList'],
    endpoints: () => ({})
})