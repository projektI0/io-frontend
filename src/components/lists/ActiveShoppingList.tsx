import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import EmptyListMessage from "./EmptyListMessage";
import {useDeleteShoppingListProductMutation, useGetShoppingListWithProductsQuery} from "../../api/apiProducts";
import {ShoppingListProduct} from "../products/types";
import {removeProduct, setActiveProducts} from "../../store/listsSlice";

const ActiveShoppingList = () => {
    const dispatch = useAppDispatch()
    const activeListId = useAppSelector(state => state.lists.activeList?.id ?? -1)
    const activeProducts = useAppSelector(state => state.lists.activeProducts)

    const {data: list, isSuccess: listIsSuccess} = useGetShoppingListWithProductsQuery(activeListId, {
        skip: activeListId < 0
    });
    const [removeShoppingListItem] = useDeleteShoppingListProductMutation()

    const [listProducts, setListProducts] = useState<ShoppingListProduct[]>([])

    useEffect(() => {
        if (!listIsSuccess) {
            return
        }
        setListProducts(list.products)
        dispatch(setActiveProducts(list.products))
    }, [listIsSuccess, list]);

    const handleRemoveItem = async (item: ShoppingListProduct) => {
        await removeShoppingListItem({
            listId: activeListId,
            productId: item.product.product.id
        })
        dispatch(removeProduct(item))
        setListProducts(activeProducts)
    }

    return (
        <div className="md:col-span-4 flex flex-col items-center">
            <h1 className="p-10 text-3xl text-primary font-bold">
                Active list
            </h1>
            <ul className={"flex flex-col w-2/4 "}>
                {listProducts.length === 0 ? (
                    <EmptyListMessage/>
                ) : (
                    listProducts.map((item) =>
                        (<li key={item.product.product.id}
                             className={"flex justify-between items-center text-lg px-4 py-1 m-1 bg-violet-100 rounded-md"}>
                                <div>
                                    {item.product.product.name}
                                </div>
                                <button className="bg-primary text-white rounded-md px-4 py-2 m-1"
                                        onClick={() => handleRemoveItem(item)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor"
                                         className="w-6 h-6">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"/>
                                    </svg>
                                </button>
                            </li>
                        )
                    )
                )}
            </ul>
        </div>
    );
};

export default ActiveShoppingList;