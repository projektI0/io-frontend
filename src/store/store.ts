import {configureStore} from "@reduxjs/toolkit";
import listsSlice from "./listsSlice";
import {api} from "../api/api";

export const store = configureStore({
    reducer: {
        lists: listsSlice,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch