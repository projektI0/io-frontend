import axios from "axios";
import {API_HEADERS} from "../Auth/types/types";
import {authHeader} from "../Auth/AuthService";

const API_URL: string = import.meta.env.VITE_API_URL;

export const search = (name: string) => {
    return axios
        .post(API_URL + "products/filter", name, {
            headers: {
                "Content-Type": API_HEADERS['Content-Type'],
                "Accept": API_HEADERS['Accept'],
                "Authorization": authHeader(),
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
};

export const getTags = () => {

}