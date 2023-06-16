import {RecipeFormData} from "./types";
import {Product} from "../products/types";

export const validateFormData = (data: RecipeFormData) => {
    const errors: Partial<RecipeFormData> = {};

    if (!validateName(data.name)) {
        errors.name = "Name is required, cannot be empty, must be at least 3 characters long and less than 255 characters long.";
    }

    if (!validateDescription(data.description)) {
        errors.description = "Description is required, cannot be empty, must be at least 10 characters long and less than 255 characters long.";
    }

    if (!validateIngredients(data.ingredients)) {
        errors.description = "Two different ingredients required at minimum";
    }

    return errors;
};

const validateName = (name: string): boolean => {
    return name.trim().length >= 3 && name.trim().length < 255;
}

const validateDescription = (description: string): boolean => {
    return description.trim().length >= 10 && description.trim().length < 255;
}

const validateIngredients = (ingredients: Product[]): boolean => {
    return ingredients.length >= 2;
}