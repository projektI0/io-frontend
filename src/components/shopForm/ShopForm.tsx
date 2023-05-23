import React, {useEffect, useState} from "react";
import {ServerResponse, ShopFormData, ShopFormValidationError} from "./types/types";
import {validateShopFormData} from "./validation/validation";
import axios from "axios";
import {authHeader} from "../auth/AuthService";
import {NavigateFunction, useNavigate} from "react-router";
import {Tag} from "../map/types/types";
import {useGetAllTagsQuery} from "../../api/apiProducts";
import Multiselect from "multiselect-react-dropdown";

const API_URL: string = import.meta.env.VITE_API_URL;

const ShopForm = () => {
    const [formData, setFormData] = useState<ShopFormData>({
        name: "",
        latitude: 0,
        longitude: 0,
        address: "",
        tags: []
    });
    const [formError, setFormError] = useState<Partial<ShopFormValidationError>>({});
    const [response, setResponse] = useState<ServerResponse | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [localTags, setLocalTags] = useState<Tag[]>([])
    const {data: dataTags, isSuccess: tagsIsSuccess} = useGetAllTagsQuery()

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!tagsIsSuccess) {
            return
        }
        setLocalTags(dataTags)
    }, [tagsIsSuccess, dataTags]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSelect = (selectedList: Tag[], selectedItem: any) => {
        setFormData((prevState) => ({
            ...prevState,
            tags: selectedList
        }));
    }

    const onRemove = (selectedList: Tag[], removedItem: any) => {
        setFormData((prevState) => ({
            ...prevState,
            tags: selectedList
        }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFormError({});
        setResponse(null);

        const validationErrors = validateShopFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setFormError(validationErrors);

        return;
      }

        axios.post(API_URL + "/shops", {...formData, tags: formData.tags.map(tag => tag.id)}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": authHeader(),
            }
        }).then((response) => {
        if (response.status === 200) {
          setResponse({status: response.status, message: "Shop added successfully!"});
        } else {
          setResponse({status: response.status, message: response.data.message});
        }
      }).catch((error) => {
        setResponse({status: error.response.status, message: error.response.data.message});
      }).finally(() => {
          setShowPopup(true);
          setFormData({name: "", latitude: 0, longitude: 0, address: "", tags: []});
      });
    };

    const handleGoHome = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      clear();
      navigate("/");
    }

    const handleAddAnotherShop = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      clear();
    };

    const clear = () => {
      setShowPopup(false);
      setFormError({});
        setResponse(null);
        setFormData({name: "", latitude: 0, longitude: 0, address: "", tags: []});
    }

    return (
        (showPopup && response) ?
            (
                <div className="w-3/4 md:w-1/2 lg:w-1/4 mx-auto p-10 flex flex-col">
                    <p className="text-primary font-bold text-center text-xl mb-2">{response.message}</p>
                    <div className="w-1/2 mx-auto flex flex-col justify-center mt-4 cursor-pointer">
                        <button
                            className="mb-2 px-2 py-2 bg-primary rounded-md text-gray-100 font-semibold border-2 hover:text-primary hover:bg-white hover:border-primary hover:border-2"
                            onClick={handleAddAnotherShop}
                        >
                            Add another shop
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
                    className="w-4/6 md:w-1/2 lg:w-1/3 mx-auto my-6 border-secondary border-2 rounded-md font-body text-xs lg:text-lg text-primary">
                    <form
                        className="w-full mx-auto py-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="w-5/6 mx-auto">
                            <label
                                htmlFor="name"
                                className={"mb-2 text-base md:text-lg"}
                            >
                      Name
                  </label>
                  <input
                      className={"w-full h-8 border-secondary text-gray-800 text-base"}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      placeholder="Kaufland"
                      onChange={handleInputChange}
                      required />
                  {formError.name && <span className="text-xs text-red-500">{formError.name}</span>}
                </div>

                        <div className="w-5/6 mx-auto">
                  <label
                      htmlFor="latitude"
                      className={"mb-2 text-base md:text-lg"}
                  >
                      Latitude</label>
                  <input
                      className={"w-full h-8 border-secondary text-gray-800 text-base"}
                      type="number"
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      required />
                  {formError.latitude && <span className="text-xs text-red-500">{formError.latitude}</span>}
                </div>

                        <div className="w-5/6 mx-auto">
                  <label
                      htmlFor="longitude"
                      className={"mb-2 text-base md:text-lg"}
                  >
                      Longitude
                  </label>
                  <input
                      className={"w-full h-8 border-secondary text-gray-800 text-base"}
                      type="number"
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      required />
                  {formError.longitude && <span className="text-xs text-red-500">{formError.longitude}</span>}
                </div>

                        <div className="w-5/6 mx-auto">
                  <label
                      htmlFor="address"
                      className={"mb-2 text-base md:text-lg"}
                  >
                      Address
                  </label>
                  <input
                      className={"w-full h-8 border-secondary text-gray-800 text-base"}
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      placeholder="Bratysławska 4"
                      onChange={handleInputChange}
                      required/>
                            {formError.address && <span className="text-xs text-red-500">{formError.address}</span>}
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
                                onSelect={onSelect}
                                onRemove={onRemove}
                                placeholder="Select tags for shop"
                            />
                        </div>


                        <div
                            className="w-1/2 md:w-1/3 mx-auto mt-2 bg-primary text-gray-100 text-center rounded-md border-2 hover:text-primary hover:bg-white hover:border-primary hover:border-2">
                            <button
                                className="cursor-pointer p-2 text-sm md:text-lg font-bold"
                                type="submit"
                            >
                                Add new shop
                            </button>
                        </div>
                    </form>
            </div>
          )
    );
};

export default ShopForm;
