import {createSlice} from "@reduxjs/toolkit";

interface List {
    listName: string;
    listItems: string[];
}

interface ListsState {
    activeList: string;
    activeListItems: string[];
    newListName: string;
    lists: List[];
}

const initialStateValue: ListsState = {
    activeList: "Groceries",
    activeListItems: [],
    newListName: "",
    lists: [
        {listName: "Groceries", listItems: ["Item 1", "Item 2", "Item 3"]},
        {listName: "Clothes", listItems: ["Item 4", "Item 5", "Item 6"]},
        {listName: "Electronics", listItems: ["Item 7", "Item 8", "Item 9"]},
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
        setActiveListName: (state, action) => {
            state.activeList = action.payload
        },
        setActiveListItems: (state, action) => {
            state.activeListItems = action.payload;
        },
        removeActiveListItem: (state, action) => {
            const activeList = state.lists.find(list => list.listName === state.activeList);
            if (activeList) {
                activeList.listItems = activeList.listItems.filter(item => item !== action.payload)
            }
        },
        setCurrentList: (state, action) => {
            state.activeList = action.payload
        },
        renameList: (state, action) => {
            const {oldName, newName} = action.payload;
            const listToRename = state.lists.find(list => list.listName === oldName);
            if (listToRename) {
                listToRename.listName = newName;
            }
        },
        updateNewListName: (state, action) => {
            state.newListName = action.payload;
        }
    }
});

export const {
    addList,
    removeList,
    setCurrentList,
    renameList,
    setActiveListName,
    setActiveListItems,
    removeActiveListItem,
    updateNewListName
} = listsSlice.actions;
export default listsSlice.reducer;