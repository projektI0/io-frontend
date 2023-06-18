import React, {useEffect, useState} from "react";
import {RecipeFormData, ServerResponse} from "./types";
import {validateFormData} from "./validation";
import axios from "axios";
import {authHeader} from "../auth/AuthService";
import {NavigateFunction, useNavigate} from "react-router";
import {Tag} from "../map/types/types";
import {useGetAllProductsQuery, useGetAllTagsQuery} from "../../api/apiProducts";
import Multiselect from "multiselect-react-dropdown";
import {Product} from "../products/types";

const API_URL: string = import.meta.env.VITE_API_URL;

const RecipeForm = () => {
    const [formData, setFormData] = useState<RecipeFormData>({name: "", description: "", ingredients: [], tags: []});
    const [formError, setFormError] = useState<Partial<RecipeFormData>>({});
    const [response, setResponse] = useState<ServerResponse | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [localTags, setLocalTags] = useState<Tag[]>([])
    const [localProducts, setLocalProducts] = useState<Product[]>([])
    const {data: dataTags, isSuccess: tagsIsSuccess} = useGetAllTagsQuery()
    const {data: dataProducts, isSuccess: productsIsSuccess} = useGetAllProductsQuery()

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (tagsIsSuccess && dataTags) {
            setLocalTags(dataTags)
        }
    }, [tagsIsSuccess, dataTags]);

    useEffect(() => {
        if (productsIsSuccess && dataProducts) {
            setLocalProducts(dataProducts)
        }
    }, [productsIsSuccess, dataProducts]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onTagSelect = (selectedList: Tag[], selectedItem: any) => {
        setFormData((prevState) => ({
            ...prevState,
            tags: selectedList
        }));
    }

    const onTagRemove = (selectedList: Tag[], removedItem: any) => {
        setFormData((prevState) => ({
            ...prevState,
            tags: selectedList
        }));
    }

    const onProductSelect = (selectedList: Product[], selectedItem: any) => {
        setFormData((prevState) => ({
            ...prevState,
            ingredients: selectedList
        }));
    }

    const onProductRemove = (selectedList: Product[], removedItem: any) => {
        setFormData((prevState) => ({
            ...prevState,
            ingredients: selectedList
        }));
    }

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFormError({});
        setResponse(null);

        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setFormError(validationErrors);

            return;
        }

        axios.post(API_URL + "/recipes", {
            ...formData,
            ingredients: formData.ingredients.map(product => product.id),
            tags: formData.tags.map(tag => tag.id)
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": authHeader(),
            }
        }).then((response) => {
            if (response.status === 200) {
                setResponse({status: response.status, message: "Product added successfully!"});
            } else {
                setResponse({status: response.status, message: response.data.message});
            }
        }).catch((error) => {
            setResponse({status: error.response.status, message: error.response.data.message});
        }).finally(() => {
            setShowPopup(true);
            setFormData({name: "", description: "", ingredients: [], tags: []});
        });
    };

    const handleGoHome = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        clear();
        navigate("/");
    }

    const handleAddAnotherRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        clear();
    };

    const clear = () => {
        setShowPopup(false);
        setFormError({});
        setResponse(null);
        setFormData({name: "", description: "", ingredients: [], tags: []});
    }

    return (
        (showPopup && response) ?
            (
                <div className="w-3/4 md:w-1/2 lg:w-1/4 mx-auto p-10 flex flex-col">
                    <p className="text-primary font-bold text-center text-xl mb-2">
                        {response.message}
                    </p>
                    <div className="w-1/2 mx-auto flex flex-col justify-center mt-4 cursor-pointer">
                        <button
                            className="mb-2 px-2 py-2 bg-primary rounded-md text-gray-100 font-semibold border-2 hover:text-primary hover:bg-white hover:border-primary hover:border-2"
                            onClick={handleAddAnotherRecipe}
                        >
                            Add another recipe
                        </button>
                        <button
                            className="px-2 py-2 bg-primary rounded-md text-gray-100 font-semibold border-2 hover:text-primary hover:bg-white hover:border-primary hover:border-2"
                            onClick={handleGoHome}
                        >
                            Go home
                        </button>
                    </div>
                </div>
            ) :
            (
                <div
                    className="w-4/6 md:w-1/2 lg:w-1/3 mx-auto my-10 border-secondary border-2 rounded-md font-body text-xs lg:text-base text-primary">
                    <form className="w-full mx-auto py-4"
                          onSubmit={handleSubmit}
                    >
                        <div className="w-5/6 mx-auto">
                            <label
                                htmlFor="name"
                                className={"mb-2 text-base md:text-lg"}
                            >
                                Name:<br/>
                            </label>
                            <input
                                className={"w-full h-8 border-secondary text-gray-800 text-base border-2 rounded-md"}
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required/>
                            {formError.name && <span className="text-xs text-red-500">{formError.name}</span>}
                        </div>

                        <div className="w-5/6 mx-auto">
                            <label
                                htmlFor="description"
                                className={"mb-2 text-base md:text-lg"}
                            >
                                Description:
                            </label>
                            <textarea
                                className={"w-full border-secondary text-gray-800 text-base h-10 border-2 rounded-md"}
                                id="description"
                                name="description"
                                rows={5}
                                cols={50}
                                value={formData.description}
                                onChange={handleTextAreaChange}
                                required/>
                            {formError.description &&
                                <span className="m-0 p-0 text-xs text-red-500">{formError.description}</span>}
                        </div>

                        <div className="w-5/6 mx-auto">
                            <label
                                htmlFor="ingredients"
                                className={"mb-2 text-base md:text-lg"}
                            >
                                Ingredients
                            </label>
                            <Multiselect
                                className="m-0 border-secondary border-2 rounded-md"
                                options={localProducts}
                                selectedValues={formData.ingredients}
                                displayValue="name"
                                onSelect={onProductSelect}
                                onRemove={onProductRemove}
                                placeholder="Select ingredients for recipe"

                            />
                        </div>

                        <div className="w-5/6 mx-auto">
                            <label
                                htmlFor="tags"
                                className={"mb-2 text-base md:text-lg"}
                            >
                                Tags
                            </label>
                            <Multiselect
                                className="m-0 border-secondary border-2 rounded-md"
                                options={localTags}
                                selectedValues={formData.tags}
                                displayValue="name"
                                onSelect={onTagSelect}
                                onRemove={onTagRemove}
                                placeholder="Select tags for recipe"

                            />
                        </div>

                        <div
                            className="w-1/3 mx-auto mt-4 bg-primary text-gray-100 text-center rounded-md border-2 hover:text-primary hover:bg-white hover:border-primary hover:border-2">
                            <button
                                className="cursor-pointer py-2 text-sm md:text-lg font-bold"
                                type="submit"
                            >
                                Add new recipe
                            </button>
                        </div>
                    </form>
                </div>
            )
    );
};

export default RecipeForm;
