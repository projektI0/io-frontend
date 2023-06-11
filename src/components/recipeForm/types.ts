import {Tag} from "../map/types/types";
import {Product} from "../products/types";

export interface RecipeFormData {
    name: string;
    description: string;
    ingredients: Product[]
    tags: Tag[]
}

export interface ServerResponse {
    status: number,
    message: string,
}