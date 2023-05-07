import {createSlice} from "@reduxjs/toolkit";
import {ShoppingList} from "../components/lists/types";
import {ShoppingListProduct} from "../components/products/types";

interface ListsState {
    activeList?: ShoppingList;
    activeProducts: ShoppingListProduct[];
    query: string;
    lists: ShoppingList[];
}

const initialStateValue: ListsState = {
    activeList: undefined,
    activeProducts: [],
    query: "",
    lists: []
};

export const listsSlice = createSlice({
    name: "lists",
    initialState: initialStateValue,
    reducers: {
        setActiveList: (state, action) => {
            state.activeList = action.payload
        },
        setQuery: (state, action) => {
            state.query = action.payload
        },
        setActiveProducts: (state, action) => {
            state.activeProducts = action.payload
        },
        addList: (state, action) => {
            state.lists.push(action.payload)
        },
        removeList: (state, action) => {
            state.lists = state.lists.filter(list => list !== action.payload)
        },
        setLists: (state, action) => {
            state.lists = action.payload
        },
        addProduct: (state, action) => {
            state.activeProducts.push(action.payload)
        },
        updateProduct: (state, action) => {
            const {previous, updated} = action.payload;
            state.activeProducts = state.activeProducts.filter(product => product !== previous)
            state.activeProducts.push(updated)
        },
        removeProduct: (state, action) => {
            state.activeProducts = state.activeProducts.filter(product => product !== action.payload)
        },
        removeProductFromBase: (state, action) => {
            state.activeProducts = state.activeProducts.filter(product => product.product !== action.payload)
        },
        renameList: (state, action) => {
            const {oldName, newName} = action.payload;
            const listToRename = state.lists.find(otherList => otherList.name === oldName);
            if (listToRename) {
                listToRename.name = newName;
                state.activeList = listToRename
            }
        }
    }
});

export const {
    addList,
    removeList,
    setLists,
    addProduct,
    updateProduct,
    removeProduct,
    removeProductFromBase,
    setActiveProducts,
    setQuery,
    setActiveList,
    renameList,
} = listsSlice.actions;
export default listsSlice.reducer;