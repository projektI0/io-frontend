import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {renameList, setActiveListItems, setActiveListName, setCurrentList} from "../../store/listsSlice";
import AddList from "./AddList";
import RemoveList from "./RemoveList";
import {Tooltip} from "react-tooltip"
import {Link} from "react-router-dom";
import EditList from "./EditList";
import {useGetShoppingListsQuery} from "../../api/apiSlice";

const ShoppingLists = () => {
    const {
        data: shoppingListsData,
        isLoading: shoppingListsIsLoading,
        isSuccess: shoppingListsIsSuccess,
        isError: shoppingListsIsError,
        error: shoppingListsError
    } = useGetShoppingListsQuery({});

    let fetchedLists: { id: number, name: string }[] = []

    if (shoppingListsIsSuccess) {
        fetchedLists = shoppingListsData.map((list: { id: number; name: string; }) => ({
            id: list.id, name: list.name
        }))
    }

    const dispatch = useAppDispatch()

    const currentListRef = useAppSelector(state => state.lists.activeList)
    const shoppingListsRef = useAppSelector(state => state.lists.lists.map((list) => list.listName))
    const shoppingListsItemsRef = useAppSelector(state => state.lists.lists.map((list) => list.listItems))
    const editInputValue = useAppSelector(state => state.lists.newListName)

    const [shoppingLists, setShoppingLists] = useState<string[]>([""])
    const [shoppingListsItems, setShoppingListsItems] = useState<string[][]>([[""]])
    const [activeListIndex, setActiveListIndex] = useState<number>(0)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)

    const handleEditList = () => {
        dispatch(renameList({oldName: shoppingLists[activeListIndex], newName: editInputValue}))
        dispatch(setCurrentList(shoppingLists[activeListIndex]))
        setShoppingLists(shoppingListsRef)
    }

    const findListIndex = (listName: string): number => {
        const item = fetchedLists.find(item => item.name === listName)
        if (item) {
            return item.id;
        }
        return -1;
    }

    useEffect(() => {
        setShoppingLists(fetchedLists.map((list) => list.name))
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
                                <Link to={"/current-list"}
                                      className={`${index !== activeListIndex ? "pointer-events-none" : ""} cursor-pointer px-2 py-1 hover:bg-primary hover:text-white hover:rounded-md tracking-wide font-medium`}
                                      data-tooltip-id="see-list-details"
                                      data-tooltip-content="See list details"
                                      data-tooltip-place="top">
                                    {list}
                                </Link>
                                <Tooltip id="see-list-details"/>
                            </div>

                            <div className={"flex"}>
                                <button
                                    className={`bg-primary text-white rounded-md px-4 py-2 m-1 mr-2 ${index !== activeListIndex ? "opacity-75" : ""}`}
                                    disabled={index !== activeListIndex}
                                    onClick={() => {
                                        index === activeListIndex ? setShowEditModal(true) : setShowEditModal(false)
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor"
                                         className="w-6 h-6">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>
                                </button>
                                <RemoveList index={findListIndex(list)} listName={list}/>
                            </div>

                            {showEditModal && <EditList
                                onEditList={handleEditList}
                                onCloseModal={() => setShowEditModal(false)}
                            />}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default ShoppingLists;
