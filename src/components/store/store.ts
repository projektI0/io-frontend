import {configureStore} from "@reduxjs/toolkit";
import currentListSlice from "./currentListSlice";
import listsSlice from "./listsSlice";

export const store = configureStore({
    reducer: {
        lists: listsSlice,
        currentList: currentListSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch