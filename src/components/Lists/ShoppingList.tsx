import {useState} from "react";

const ShoppingList = () => {
    const listName = "Groceries"
    const [listItems, setListItems] = useState([
        "banana", "apple", "orange", "pear", "lemon", "lime"
    ])

    const handleRemoveItem = (itemName: string) => {
        setListItems(listItems.filter((item) => item !== itemName));
    }

    return (
        <div className="md:col-span-4 flex flex-col items-center">
            <h1 className="p-10 text-3xl text-primary font-bold">
                List: <span className={"font-medium"}>{listName}</span>
            </h1>
            <ul className={"flex flex-col w-2/4 "}>
                {listItems.map((item) => {
                    return (<li key={item}
                                className={"flex justify-between items-center text-lg px-4 py-1 m-2 bg-violet-100 rounded-md"}>
                        <div>
                            <input type={"checkbox"} className={"mr-4 w-4 h-4"}/>
                            {item}
                        </div>
                        <button className="bg-primary text-white rounded-md px-4 py-2 m-1"
                                onClick={() => handleRemoveItem(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"/>
                            </svg>
                        </button>
                    </li>)
                })}
            </ul>
        </div>
    );
};

export default ShoppingList;
