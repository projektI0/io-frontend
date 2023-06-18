import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import EmptyListMessage from "./EmptyListMessage";
import {
    useDeleteShoppingListProductMutation,
    useGetShoppingListWithProductsQuery,
    useUpdateShoppingListProductMutation
} from "../../api/apiProducts";
import {ShoppingListProduct} from "../products/types";
import {removeProduct, setActiveProducts, updateProduct} from "../../store/listsSlice";
import {Tooltip} from "react-tooltip";

const ActiveShoppingList = () => {
    const dispatch = useAppDispatch()
    const activeListId = useAppSelector(state => state.lists.activeList?.id ?? -1)
    const activeProducts = useAppSelector(state => state.lists.activeProducts)

    const {data: list, isSuccess: listIsSuccess} = useGetShoppingListWithProductsQuery({shoppingListId: activeListId}, {
        skip: activeListId < 0
    });
    const [removeShoppingListItem] = useDeleteShoppingListProductMutation()
    const [updateShoppingListItem] = useUpdateShoppingListProductMutation()

    const [listProducts, setListProducts] = useState<ShoppingListProduct[]>([])

    useEffect(() => {
        if (!listIsSuccess) {
            return
        }
        setListProducts(list.products)
        dispatch(setActiveProducts(list.products))
    }, [listIsSuccess, list]);

    const handleRemoveProduct = async (product: ShoppingListProduct) => {
        await removeShoppingListItem({
            shoppingListId: activeListId,
            productId: product.product.product.id
        })
        dispatch(removeProduct(product))
        setListProducts(activeProducts)
    }

    const handleCrossOutProduct = async (product: ShoppingListProduct) => {
        const updatedProduct = {...product, crossedOut: !product.crossedOut}
        await updateShoppingListItem({
            shoppingListId: activeListId,
            productId: product.product.product.id,
            updatedProduct: {...updatedProduct, shoppingListId: activeListId, productId: product.product.product.id}
        });
        dispatch(updateProduct({previous: product, updated: updatedProduct}));
        setListProducts(activeProducts);
    }

    const handleChangeQuantityUpProduct = async (product: ShoppingListProduct) => {
        const updatedProduct = {...product, quantity: product.quantity + 1}
        await updateShoppingListItem({
            shoppingListId: activeListId,
            productId: product.product.product.id,
            updatedProduct: {...updatedProduct, shoppingListId: activeListId, productId: product.product.product.id}
        });
        dispatch(updateProduct({previous: product, updated: updatedProduct}));
        setListProducts(activeProducts);
    }

    const handleChangeQuantityDownProduct = async (product: ShoppingListProduct) => {
        if (product.quantity === 1) {
            return
        }

        const updatedProduct = {...product, quantity: product.quantity - 1}
        await updateShoppingListItem({
            shoppingListId: activeListId,
            productId: product.product.product.id,
            updatedProduct: {...updatedProduct, shoppingListId: activeListId, productId: product.product.product.id}
        });
        dispatch(updateProduct({previous: product, updated: updatedProduct}));
        setListProducts(activeProducts);
    }

    return (
        <div className="flex flex-col items-center w-5/6 md:w-4/6 lg:w-1/2 mx-auto">
            <div className="flex justify-center items-center">
                <h1 className="p-10 text-2xl text-primary font-bold">
                    Active list
                </h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 justify-self-end text-primary hover:opacity-50 hover:cursor-pointer"
                    data-tooltip-id="intro"
                    data-tooltip-content="For app usage tutorial visit your profile :)"
                    data-tooltip-place="bottom"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                </svg>
                <Tooltip id="intro" />
            </div>
            <ul className={"flex flex-col w-full "}>
                {listProducts.length === 0 ? (
                    <EmptyListMessage/>
                ) : (
                    listProducts.map((item) =>
                        (<li key={item.product.product.id}
                             className={"flex justify-between items-center text-sm md:text-base lg:text-lg px-4 py-1 m-1 bg-violet-100 rounded-md"}>
                                <div className={"pr-8"}>
                                    {item.crossedOut ? (<p> <s> {item.product.product.name} </s> </p>) : (<p> {item.product.product.name}</p>)}
                                </div>
                                <div className='flex flex-row items-center justify-center gap-2'>
                                    <div className='flex flex-row items-center justify-center gap-4
                                    '>
                                        <p className={"font-bold"}> x{item.quantity} </p>
                                        <div className='flex flex-col items-center justify-center'>
                                            <button
                                                className={`${item.quantity === 1 ? 'bg-zinc-400' : 'bg-primary'} text-white rounded-md pl-1 pr-2 py-1 m-1 bg-opacity-0 hover:scale-125`}
                                                onClick={() => handleChangeQuantityUpProduct(item)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    className={`text-primary w-6 h-6`}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M18 15l-6-6-6 6"/>
                                                </svg>
                                            </button>
                                            <button
                                                className={`${item.quantity === 1 ? 'bg-zinc-400' : 'bg-primary'} text-white rounded-md pl-1 pr-2 py-1 m-1 bg-opacity-0 hover:scale-125`}
                                                onClick={() => handleChangeQuantityDownProduct(item)}
                                                disabled={item.quantity === 1}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    className={`${item.quantity === 1 ? 'text-zinc-400' : 'text-primary'} w-6 h-6`}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M6 9l6 6 6-6"/>
                                                </svg>
                                            </button>

                                        </div>
                                    </div>

                                    {
                                        item.crossedOut ? (
                                            <button
                                                className="bg-primary text-white rounded-md px-4 py-2 m-1"
                                                data-tooltip-id="undo-cross-out-product"
                                                data-tooltip-content="Undo"
                                                data-tooltip-place="top"
                                                onClick={() => handleCrossOutProduct(item)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                                </svg>
                                                <Tooltip id="undo-cross-out-product" />
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-primary text-white rounded-md px-4 py-2 m-1"
                                                data-tooltip-id="cross-out-product"
                                                data-tooltip-content="Cross out"
                                                data-tooltip-place="top"
                                                onClick={() => handleCrossOutProduct(item)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={1.5}
                                                    className="w-6 h-6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <Tooltip id="cross-out-product" />
                                            </button>
                                        )
                                    }
                                    <button className="bg-primary text-white rounded-md px-4 py-2 m-1"
                                            onClick={() => handleRemoveProduct(item)}
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
                                </div>
                            </li>
                        )
                    )
                )}
            </ul>
        </div>
    );
};

export default ActiveShoppingList;