import { ProductFormData } from "../types/types";


export const validateFormData = (data: ProductFormData) => {
    const errors: Partial<ProductFormData> = {};

    if (!validateName(data.name)) {
      errors.name = "Name is required, cannot be empty, must be at least 3 characters long and less than 255 characters long.";
    }

    if (!validateDescription(data.description)) {
        errors.description = "Description is required, cannot be empty, must be at least 10 characters long and less than 255 characters long.";
      }

    return errors;
};

const validateName = (name: string): boolean => {
    return name.trim().length >= 3 && name.trim().length < 255;
}

const validateDescription = (description: string): boolean => {
    return description.trim().length >= 10 && description.trim().length < 255;
}