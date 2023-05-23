import {Tag} from "../../map/types/types";

export interface ShopFormData {
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    tags: Tag[]
}

export interface ShopFormValidationError {
    name: string,
    latitude: string,
    longitude: string,
    address: string,
    tags: Tag[]
}

export interface ServerResponse {
    status: number,
    message: string,
}