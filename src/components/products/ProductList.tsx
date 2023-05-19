import React, {useEffect, useState} from "react";
import {Product, ShoppingListProduct} from "./types";
import Multiselect from 'multiselect-react-dropdown';
import {
    useAddShoppingListProductMutation,
    useDeleteShoppingListProductMutation,
    useGetAllTagsQuery,
    useGetProductsWithFilterMutation,
    useGetShoppingListWithProductsQuery
} from "../../api/apiProducts";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addProduct, removeProductFromBase, setActiveProducts, setQuery, setTags} from "../../store/listsSlice";
import "./Products.css"
import {Tag} from "../map/types/types";

const ProductList = () => {
    const dispatch = useAppDispatch()
    const activeListId = useAppSelector(state => state.lists.activeList?.id ?? -1)
    const activeProducts = useAppSelector(state => state.lists.activeProducts)
    const query = useAppSelector(state => state.lists.query)
    const tags = useAppSelector(state => state.lists.tags)
    const {data: list, isSuccess: listIsSuccess} = useGetShoppingListWithProductsQuery({shoppingListId: activeListId}, {
        skip: activeListId < 0
    });
    const [searchData, searchIsSuccess] = useGetProductsWithFilterMutation()
    const [addNewShoppingListItem] = useAddShoppingListProductMutation()
    const [removeShoppingListItem] = useDeleteShoppingListProductMutation()
    const {data: dataTags, isSuccess: tagsIsSuccess} = useGetAllTagsQuery()

    const [localTags, setLocalTags] = useState<Tag[]>([])
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    const [listProducts, setListProducts] = useState<ShoppingListProduct[]>([])

    useEffect(() => {
        if (query !== "" || tags.length !== 0) {
            searchData({query: query, tags: tags.map(tag => tag.id)}).unwrap().then(products => {
                setSearchedProducts(products.data)
            })
        } else {
            setSearchedProducts([])
        }
    }, [query, tags]);

    useEffect(() => {
        if (!listIsSuccess) {
            return
        }
        setListProducts(list.products)
        dispatch(setActiveProducts(list.products))
    }, [listIsSuccess, list]);

    useEffect(() => {
        if (!tagsIsSuccess) {
            return
        }
        setLocalTags(dataTags)
    }, [tagsIsSuccess, dataTags]);

    const onSelect = (selectedList: any, selectedItem: any) => {
        dispatch(setTags(selectedList))
    }

    const onRemove = (selectedList: any, removedItem: any) => {
        dispatch(setTags(selectedList))
    }

    const handleProductCheck = async (e: React.ChangeEvent<HTMLInputElement>, product: Product) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            await addNewShoppingListItem({
                shoppingListId: activeListId,
                product: {shoppingListId: activeListId, productId: product.id, quantity: 1, crossedOut: false}
            }).unwrap().then((response) => {
                dispatch(addProduct(response))
                setListProducts(activeProducts);
            })
        } else {
            const removedProduct = listProducts.find((selectedProduct) => selectedProduct.product.product.id === product.id);
            if (removedProduct) {
                await removeShoppingListItem({shoppingListId: activeListId, productId: product.id})
                dispatch(removeProductFromBase(product))
                setListProducts(activeProducts)
            }
        }
    }

    const checkIfProductOnList = (product: Product) => {
        if (listProducts.length !== 0) {
            return listProducts.some((selectedProduct) => selectedProduct.product.product.id === product.id)
        } else {
            return false;
        }
    }

    return (
        <div className="mt-4 w-5/6 sm:w-1/2 md:w-1/2 lg:w-1/3 mx-auto flex flex-col justify-between items-center font-body">
            <div className="w-5/6 p-0 mb-2">
                <Multiselect
                    className="m-0 border-secondary border-2 rounded-md"
                    options={localTags}
                    selectedValues={tags}
                    displayValue="name"
                    onSelect={onSelect}
                    onRemove={onRemove}
                />
            </div>
            <div className="w-5/6 mb-6">
                <input
                    className="w-full border-secondary border-2 rounded-md"
                    placeholder="Enter product name"
                    value={query}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                />
            </div>
            <div className="w-full flex justify-center">
                <ol className="products-ol">
                    {   
                        searchedProducts.map((product, index) => (
                            <li key={index}>
                                {activeListId >= 0 &&
                                    <input
                                        type="checkbox"
                                        checked={checkIfProductOnList(product)}
                                        onChange={(e) => handleProductCheck(e, product)}
                                    />
                                }
                                {index + 1} : {product.name} - {product.description}
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
};

export default ProductList;