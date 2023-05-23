import {Tag} from "../../map/types/types";

export interface ProductFormData {
    name: string;
    description: string;
    tags: Tag[]
}

export interface ServerResponse {
    status: number,
    message: string,
}