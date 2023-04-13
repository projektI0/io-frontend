import React, {useState} from 'react';

const ShoppingListContainer = () => {
    const [shoppingLists, setShoppingLists] = useState([
        "Groceries", "Clothes", "Electronics"
    ])
    const [activeListIndex, setActiveListIndex] = useState(1)

    const handleRemoveItem = (itemName: string) => {
        setShoppingLists(shoppingLists.filter((item) => item !== itemName))
    };

    const handleEditList = () => {
        // TODO: Implement me
        console.log("Edit list")
    }

    return (
        <div className="md:col-span-4 flex flex-col items-center">
            <h1 className="p-10 text-3xl text-primary">My Shopping Lists</h1>
            <ul className={"w-2/4"}>
                {shoppingLists.map((list, index) => {
                    return (<li key={list}
                                className={"flex justify-between items-center text-lg px-4 py-1 m-2 bg-violet-100 rounded-md"}>
                            <div>
                                <input type={"radio"} checked={index === activeListIndex} onClick={()=> setActiveListIndex(index)} className={"p-4 mr-4"}/>
                                {list}
                            </div>
                            <div>
                                <button className="bg-primary text-white rounded-md px-4 py-2 m-1"
                                        onClick={() => handleEditList()}>
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
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default ShoppingListContainer;
