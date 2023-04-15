import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {renameList, setActiveListItems, setActiveListName, setCurrentList} from "../store/listsSlice";
import AddList from "./AddList";
import RemoveList from "./RemoveList";

const ShoppingListContainer = () => {
    const dispatch = useAppDispatch()

    const currentListRef = useAppSelector(state => state.lists.activeList)
    const shoppingListsRef = useAppSelector(state => state.lists.lists.map((list) => list.listName))
    const shoppingListsItemsRef = useAppSelector(state => state.lists.lists.map((list) => list.listItems))

    const [shoppingLists, setShoppingLists] = useState([""])
    const [shoppingListsItems, setShoppingListsItems] = useState([[""]])
    const [activeListIndex, setActiveListIndex] = useState(0)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editInputValue, setEditInputValue] = useState("");

    const handleEditInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEditInputValue(event.target.value);
    };

    const handleEditList = () => {
        dispatch(renameList({oldName: shoppingLists[activeListIndex], newName: editInputValue}))
        dispatch(setCurrentList(shoppingLists[activeListIndex]))
        setShoppingLists(shoppingListsRef)
    }

    useEffect(() => {
        setShoppingLists(shoppingListsRef)
        setShoppingListsItems(shoppingListsItemsRef)
        setActiveListIndex(shoppingLists.indexOf(currentListRef))
        dispatch(setActiveListItems(shoppingListsItems[activeListIndex]))
    }, [shoppingLists, shoppingListsItems, activeListIndex]);


    return (
        <div className="md:col-span-4 flex flex-col items-center">
            <h1 className="p-10 text-3xl text-primary font-bold">My Shopping Lists</h1>
            <AddList/>

            <ul className={"w-2/4"}>
                {shoppingLists.map((list, index) => {
                    return (<li key={list}
                                className={"flex justify-between items-center text-lg px-4 py-1 m-2 bg-violet-100 rounded-md"}>
                            <div>
                                <input type={"radio"} checked={index === activeListIndex} onClick={() => {
                                    setActiveListIndex(index)
                                    dispatch(setCurrentList(shoppingLists[index]))
                                    dispatch(setActiveListName(shoppingLists[index]))
                                    dispatch(setActiveListItems(shoppingListsItems[index]))
                                }}
                                       onChange={() => {
                                           setActiveListIndex(index)
                                           dispatch(setCurrentList(shoppingLists[index]))
                                       }} className={"p-4 mr-4"}/>
                                {list}
                            </div>
                            <div className={"flex"}>
                                <button
                                    className={`bg-primary text-white rounded-md px-4 py-2 m-1 mr-6 ${index !== activeListIndex ? "opacity-75" : ""}`}
                                    disabled={index !== activeListIndex}
                                    onClick={() => {
                                        index === activeListIndex ? setShowEditModal(true) : setShowEditModal(false)
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>
                                </button>
                                <RemoveList listName={list}/>
                            </div>

                            {showEditModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                            {/*content*/}
                                            <div
                                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div
                                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold">
                                                        Edit list name
                                                    </h3>
                                                    <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowEditModal(false)}
                                                    >
                                                    </button>
                                                </div>
                                                {/*body*/}
                                                <div className="relative p-6 flex-auto">
                                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                        To rename the list, please enter the new name below.
                                                    </p>
                                                    <input type={"text"} onChange={handleEditInputChange}/>
                                                </div>
                                                {/*footer*/}
                                                <div
                                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowEditModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="submit"
                                                        onClick={() => {
                                                            setShowEditModal(false)
                                                            handleEditList()
                                                        }}
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default ShoppingListContainer;
