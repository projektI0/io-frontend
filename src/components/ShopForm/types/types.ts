export interface ShopFormData {
    name: string;
    latitude: number;
    longitude: number;
    address: string;
}

export interface ShopFormValidationError {
    name: string,
    latitude: string,
    longitude: string,
    address: string
}

export interface ServerResponse {
    status: number,
    message: string,
}