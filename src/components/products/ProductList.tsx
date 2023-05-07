import React, {useEffect, useState} from "react";
import {search} from "./Products";
import {Product, ShoppingListProduct} from "./types";
import Multiselect from 'multiselect-react-dropdown';
import {
    useAddShoppingListProductMutation,
    useDeleteShoppingListProductMutation,
    useGetShoppingListWithProductsQuery
} from "../../api/apiProducts";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addProduct, removeProductFromBase, setActiveProducts, setQuery} from "../../store/listsSlice";
import "./Products.css"

const ProductList = () => {
    const dispatch = useAppDispatch()
    const activeListId = useAppSelector(state => state.lists.activeList?.id ?? -1)
    const activeProducts = useAppSelector(state => state.lists.activeProducts)
    const query = useAppSelector(state => state.lists.query)
    const {data: list, isSuccess: listIsSuccess} = useGetShoppingListWithProductsQuery(activeListId, {
        skip: activeListId < 0
    });
    const [addNewShoppingListItem] = useAddShoppingListProductMutation()
    const [removeShoppingListItem] = useDeleteShoppingListProductMutation()

    const tags = [{name: "drinks", id: 1}, {name: "vegetables", id: 2}, {name: "fruits", id: 3}]
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const [listProducts, setListProducts] = useState<ShoppingListProduct[]>([])

    useEffect(() => {
        if (query !== "") {
            search(query).then(response => {
                if (response.status !== 200) {
                    return;
                }
                setSearchedProducts(response.data.data)
            })
        }
    }, [query]);

    useEffect(() => {
        if (!listIsSuccess) {
            return
        }
        setListProducts(list.products)
        dispatch(setActiveProducts(list.products))
    }, [listIsSuccess, list]);

    const onSelect = (selectedList: any, selectedItem: any) => {
        setSelectedTags(selectedList);
    }

    const onRemove = (selectedList: any, removedItem: any) => {
        setSelectedTags(selectedList);
    }

    const handleProductCheck = async (e: React.ChangeEvent<HTMLInputElement>, product: Product) => {
            const isChecked = e.target.checked;
            if (isChecked) {
                await addNewShoppingListItem({
                    id: activeListId,
                    payload: {shoppingListId: activeListId, productId: product.id, quantity: 1}
                }).unwrap().then((response) => {
                    dispatch(addProduct(response))
                    setListProducts(activeProducts);
                })
            } else {
                const removedProduct = listProducts.find((selectedProduct) => selectedProduct.product.product.id === product.id);
                if (removedProduct) {
                    await removeShoppingListItem({listId: activeListId, productId: product.id})
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
            <div className="products-container md:col-span-4 p-10">
                <div className="products-multiselect-container">
                    <Multiselect  
                        className="products-multiselect"
                        options={tags} 
                        selectedValues={selectedTags} 
                        displayValue="name"
                        onSelect={onSelect} 
                        onRemove={onRemove}
                    />
                </div>
                <div className="products-input-container">
                    <input 
                        className="products-input"
                        placeholder="Enter product name" 
                        value={query}
                        onChange={(e) => dispatch(setQuery(e.target.value))}
                    />
                </div>
                <div className="products-items-container">
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