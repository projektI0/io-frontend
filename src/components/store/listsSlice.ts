import {createSlice} from "@reduxjs/toolkit";

interface List {
    listName: string;
    listItems: string[];
}

interface ListsState {
    activeList: string;
    lists: List[];
}

const initialStateValue : ListsState  = {
    activeList: "Groceries",
    lists: [
        {listName: "Groceries", listItems: ["Item 1", "Item 2", "Item 3"]},
        {listName: "Clothes", listItems: ["Item 1", "Item 2", "Item 3"]},
        {listName: "Electronics", listItems: ["Item 1", "Item 2", "Item 3"]},
    ]
};

export const listsSlice = createSlice({
    name: "lists",
    initialState: initialStateValue,
    reducers: {
        addList: (state, action) => {
            state.lists.push(action.payload)
        },
        removeList: (state, action) => {
            state.lists = state.lists.filter(list => list.listName !== action.payload)
        },
        setCurrentList: (state, action) => {
            state.activeList = action.payload
        },
        renameList: (state, action) => {
            state.lists = state.lists.map(list => {
                if (list.listName === action.payload.oldListName) {
                    list.listName = action.payload.newListName
                }
                return list
            })
        }
    }
});

export const {addList, removeList, setCurrentList, renameList} = listsSlice.actions;
export default listsSlice.reducer;