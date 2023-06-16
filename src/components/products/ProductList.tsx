import React, {useEffect, useState} from "react";
import {Product, Recipe, ShoppingListProduct} from "./types";
import Multiselect from 'multiselect-react-dropdown';
import {
    useAddShoppingListProductMutation,
    useDeleteShoppingListProductMutation,
    useGetAllTagsQuery,
    useGetProductsWithFilterMutation,
    useGetRecipesWithFilterMutation,
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
    const [searchRecipes, recipesIsSuccess] = useGetRecipesWithFilterMutation()
    const [addNewShoppingListItem] = useAddShoppingListProductMutation()
    const [removeShoppingListItem] = useDeleteShoppingListProductMutation()
    const {data: dataTags, isSuccess: tagsIsSuccess} = useGetAllTagsQuery()

    const [localTags, setLocalTags] = useState<Tag[]>([])
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);
    const [listProducts, setListProducts] = useState<ShoppingListProduct[]>([])

    useEffect(() => {
        if (query !== "" || tags.length !== 0) {
            searchData({query: query, tags: tags.map(tag => tag.id)}).unwrap().then(products => {
                setSearchedProducts(products.data)
            })
            searchRecipes({query: query, tags: tags.map(tag => tag.id)}).unwrap().then(recipes => {
                setSearchedRecipes(recipes)
            })
        } else {
            setSearchedProducts([])
            setSearchedRecipes([])
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

    const checkIfRecipeOnList = (recipe: Recipe) => {
        if (listProducts.length !== 0) {
            return recipe.ingredients.map((product) => product.id).every((id) => listProducts.map((shoppingProduct) => shoppingProduct.product.product.id).includes(id))
        } else {
            return false;
        }
    }

    const handleRecipeCheck = async (e: React.ChangeEvent<HTMLInputElement>, recipe: Recipe) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            for (const product of recipe.ingredients) {
                if (!activeProducts.some((shoppingListProduct) => shoppingListProduct.product.product.id === product.id)) {
                    await addNewShoppingListItem({
                        shoppingListId: activeListId,
                        product: {shoppingListId: activeListId, productId: product.id, quantity: 1, crossedOut: false}
                    }).unwrap().then((response) => {
                        dispatch(addProduct(response))
                        setListProducts(activeProducts);
                    })
                }
            }

        } else {
            for (const product of recipe.ingredients) {
                const removedProduct = listProducts.find((selectedProduct) => selectedProduct.product.product.id === product.id);
                if (removedProduct) {
                    await removeShoppingListItem({shoppingListId: activeListId, productId: product.id})
                    dispatch(removeProductFromBase(product))
                    setListProducts(activeProducts)
                }
            }
        }
    }

    return (
        <div
            className="mt-4 w-5/6 sm:w-1/2 md:w-1/2 lg:w-1/3 mx-auto flex flex-col justify-between items-center font-body">
            <div className="w-5/6 p-0 mb-2">
                <Multiselect
                    className="m-0 border-secondary border-2 rounded-md"
                    options={localTags}
                    selectedValues={tags}
                    displayValue="name"
                    onSelect={onSelect}
                    onRemove={onRemove}
                    placeholder="Select tags"
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
            <div className="w-full flex">
                <ol className="w-full products-ol">
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
                                {index + 1} : {product.name} : {product.description}
                            </li>
                        ))
                    }
                    {
                        searchedRecipes.map((recipe, index) => (
                            <li
                                key={index + searchedProducts.length}
                                className="flex items-start flex-col">
                                <div style={{alignSelf: 'start'}}>
                                    {activeListId >= 0 &&
                                        <input
                                            id={index.toString()}
                                            type="checkbox"
                                            checked={checkIfRecipeOnList(recipe)}
                                            onChange={(e) => handleRecipeCheck(e, recipe)}
                                        />
                                    }
                                    {index + searchedProducts.length + 1} : {recipe.name} : {recipe.description}
                                </div>
                                <ul className="flex items-start flex-col">
                                    {recipe.ingredients.map((product, anotherIndex) => (
                                        <li key={`ingredient${index * 10 + anotherIndex}`}>
                                            <div>
                                                {activeListId >= 0 &&
                                                    <input
                                                        type="checkbox"
                                                        checked={checkIfProductOnList(product)}
                                                        onChange={(e) => handleProductCheck(e, product)}
                                                    />
                                                }
                                                {product.name}
                                            </div>
                                        </li>
                                    ))
                                    }
                                </ul>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
};

export default ProductList;