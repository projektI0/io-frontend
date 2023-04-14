import React, {useEffect, useState} from 'react';
import {setListItems, setListName} from "../store/currentListSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addList, removeList, setCurrentList} from "../store/listsSlice";

const ShoppingListContainer = () => {
    const dispatch = useAppDispatch()

    const currentListRef = useAppSelector(state => state.lists.activeList)
    const [shoppingLists, setShoppingLists] = useState([""])
    const shoppingListsRef = useAppSelector(state => state.lists.lists.map((list) => list.listName))
    const [shoppingListsItems, setShoppingListsItems] = useState([[""]])
    const shoppingListsItemsRef = useAppSelector(state => state.lists.lists.map((list) => list.listItems))
    const [activeListIndex, setActiveListIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const [editInputValue, setEditInputValue] = useState("");

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };

    const handleEditInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEditInputValue(event.target.value);
    };

    const handleRemoveItem = (itemName: string) => {
        setShoppingLists(shoppingLists.filter((item) => item !== itemName))
        dispatch(removeList(itemName))
    };

    const handleAddNewList = () => {
        setShoppingLists([...shoppingLists, inputValue])
        setShoppingListsItems([...shoppingListsItems, ["Test item"]])
        dispatch(addList({listName: inputValue, listItems: ["Test item"]}))
    }

    const handleEditList = () => {
        // TODO: Implement me
        //
    }


    useEffect(() => {
        setShoppingLists(shoppingListsRef)
        setShoppingListsItems(shoppingListsItemsRef)
        setActiveListIndex(shoppingLists.indexOf(currentListRef))
        dispatch(setListName(shoppingLists[activeListIndex]))
        dispatch(setListItems(shoppingListsItems[activeListIndex]))
    }, [shoppingLists, shoppingListsItems, activeListIndex]);


    return (
        <div className="md:col-span-4 flex flex-col items-center">
            <h1 className="p-10 text-3xl text-primary font-bold">My Shopping Lists</h1>
            <div className={"w-full flex justify-end"}>
                <div>
                    <button
                        className="flex justify-center items-center mr-20 mb-6 p-2 font-bold text-lg tracking-wide bg-primary rounded-md text-white"
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        <span className={"px-2"}>New list</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </button>
                    {showModal ? (
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
                                                Add new list
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}
                                            >
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                To add new list, please enter the name of the list below.
                                            </p>
                                            <input type={"text"} onChange={handleInputChange}/>
                                        </div>
                                        {/*footer*/}
                                        <div
                                            className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                                onClick={() => {
                                                    setShowModal(false)
                                                    handleAddNewList()
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
                </div>

            </div>

            <ul className={"w-2/4"}>
                {shoppingLists.map((list, index) => {
                    return (<li key={list}
                                className={"flex justify-between items-center text-lg px-4 py-1 m-2 bg-violet-100 rounded-md"}>
                            <div>
                                <input type={"radio"} checked={index === activeListIndex} onClick={() => {
                                    setActiveListIndex(index)
                                    dispatch(setCurrentList(shoppingLists[index]))
                                    dispatch(setListName(shoppingLists[index]))
                                    dispatch(setListItems(shoppingListsItems[index]))
                                }}
                                       onChange={() => {
                                           setActiveListIndex(index)
                                           dispatch(setCurrentList(shoppingLists[index]))
                                       }} className={"p-4 mr-4"}/>
                                {list}
                            </div>
                            <div>
                                <button className="bg-primary text-white rounded-md px-4 py-2 m-1"
                                        onClick={() => {
                                            handleEditList()
                                            setShowEditModal(true)
                                        }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>
                                </button>
                                <button className="bg-primary text-white rounded-md px-4 py-2 m-1"
                                        onClick={() => handleRemoveItem(list)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"/>
                                    </svg>
                                </button>

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
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default ShoppingListContainer;
