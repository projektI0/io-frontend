import {ShopFormData, ShopFormValidationError} from "../types/types";

export const validateShopFormData = (data: ShopFormData) => {
    const errors: Partial<ShopFormValidationError> = {};

    if (!validateName(data.name)) {
      errors.name = "Name is required, cannot be empty, must be at least 3 characters long and less than 255 characters long.";
    }

    if (!validateLatitude(data.latitude)) {
        errors.latitude = "Latitude should be a number between -90 and 90.";
    }

    if (!validateLongitude(data.longitude)) {
        errors.longitude = "Longitude should be a number between -180 and 180.";
    }

    if (!validateAddress(data.address)) {
        errors.address = "Address is required, cannot be empty and must be at least 5 characters long and less than 255 characters long.";
    }

    return errors;
};

const validateName = (name: string): boolean => {
    return name.trim().length >= 3 && name.trim().length < 255;
}

const validateLatitude = (latitude: number): boolean => {
    return latitude >= -90 && latitude <= 90;
}

const validateLongitude = (longitude: number): boolean => {
    return longitude >= -180 && longitude <= 180;
}

const validateAddress = (address: string): boolean => {
    return address.trim().length >= 5 && address.trim().length < 255;
}