import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addList, removeList, renameList, setActiveList, setLists} from "../../store/listsSlice";
import AddList from "./AddList";
import RemoveList from "./RemoveList";
import {Tooltip} from "react-tooltip"
import {Link} from "react-router-dom";
import EditList from "./EditList";
import {
    useAddNewShoppingListMutation,
    useDeleteShoppingListMutation,
    useGetUserShoppingListsQuery,
    useUpdateShoppingListMutation
} from "../../api/apiLists";
import {ShoppingList} from "./types";


const ShoppingLists = () => {
    const dispatch = useAppDispatch()
    const allLists = useAppSelector(state => state.lists.lists)
    const activeList = useAppSelector(state => state.lists.activeList)

    const {data: userShoppingLists, isSuccess: shoppingListsIsSuccess,} = useGetUserShoppingListsQuery({});
    const [addNewShoppingList] = useAddNewShoppingListMutation()
    const [updateShoppingList] = useUpdateShoppingListMutation()
    const [deleteShoppingList] = useDeleteShoppingListMutation()

    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])
    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [activeListIndex, setActiveListIndex] = useState<number>(() => {
        if (activeList) {
            return allLists.indexOf(activeList);
        } else {
            return -1;
        }
    })

    useEffect(() => {
        if (!shoppingListsIsSuccess) {
            return
        }
        setShoppingLists(userShoppingLists)
    }, [userShoppingLists, shoppingListsIsSuccess])

    useEffect(() => {
        dispatch(setLists(shoppingLists))
        if (activeList) {
            setActiveListIndex(shoppingLists.map(list => list.id).indexOf(activeList.id))
        }
    }, [shoppingLists, dispatch]);


    const handleAddNewList = async (inputValue: string) => {
        await addNewShoppingList(inputValue).unwrap().then(response => {
            dispatch(addList(response))
            setShoppingLists(allLists)
        })
    }

    const handleEditList = async (editInputValue: string) => {
        const listId = shoppingLists[activeListIndex].id
        await updateShoppingList({id: listId, payload: editInputValue})
        dispatch(renameList({oldName: shoppingLists[activeListIndex].name, newName: editInputValue}))
        setShoppingLists(allLists)
    }

    const handleRemoveList = async (list: ShoppingList) => {
        if (list === activeList) {
            dispatch(setActiveList(undefined))
            setActiveListIndex(-1)
        }
        await deleteShoppingList(list.id)
        dispatch(removeList(list))
        setShoppingLists(allLists)
    }

    return (
        <div className="w-5/6 mx-auto md:col-span-4 flex flex-col items-center">
            <h1 className="p-10 text-2xl lg:text-3xl text-primary font-bold">My Shopping Lists</h1>
            <div className={"w-full flex justify-end"}>
                <button
                    className="flex justify-center items-center mr-4 md:mr-20 mb-6 p-2 font-bold text-sm md:text-base tracking-wide bg-primary rounded-md text-white"
                    type="button"
                    onClick={() => setShowAddModal(true)}>
                    <span className={"px-2"}>New list</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor"
                         className="w-6 h-6">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </button>
            </div>
            {showAddModal && <AddList
                onAddList={handleAddNewList}
                onCloseModal={() => setShowAddModal(false)}
            />}
            <ul className={"w-full lg:w-3/5"}>
                {shoppingLists.map((list, index) => {
                    return (<li key={list.id}
                                className={"flex justify-between items-center text-lg px-4 py-1 m-2 bg-violet-100 rounded-md"}>
                            <div>
                                <input type={"radio"} checked={index === activeListIndex}
                                       onChange={() => {
                                           setActiveListIndex(index)
                                           dispatch(setActiveList(shoppingLists[index]))
                                       }}
                                       className={"p-4 mr-4"}/>
                                <Link to={"/active-list"}
                                      className={`${index !== activeListIndex ? "pointer-events-none" : ""} cursor-pointer px-2 py-1 hover:bg-primary hover:text-white hover:rounded-md tracking-wide font-medium`}
                                      data-tooltip-id="see-list-details"
                                      data-tooltip-content="See list details"
                                      data-tooltip-place="top">
                                    {list.name}
                                </Link>
                                <Tooltip id="see-list-details"/>
                            </div>

                            <div className={"flex"}>
                                <button
                                    className={`bg-primary text-white rounded-md px-4 py-2 m-1 mr-2 ${index !== activeListIndex ? "opacity-75" : ""}`}
                                    disabled={index !== activeListIndex}
                                    onClick={() => setShowEditModal(index === activeListIndex)}>
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
                                <RemoveList list={list} onRemoveList={handleRemoveList}/>
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
