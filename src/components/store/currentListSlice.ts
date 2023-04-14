import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {listName: "No list selected", listItems: [""]};

export const currentListSlice = createSlice({
    name: "currentList",
    initialState: initialStateValue,
    reducers: {
        setListName: (state, action) => {
            state.listName = action.payload
        },
        setListItems: (state, action) => {
            state.listItems = action.payload
        }
    }
});

export const {setListName, setListItems} = currentListSlice.actions;
export default currentListSlice.reducer;