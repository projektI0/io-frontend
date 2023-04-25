export interface MapBounds {
    lowerLeft: L.LatLng,
    upperRight: L.LatLng
}

export interface Tag {
    id: number;
    name: string;
    parentTagId?: string;
}

export interface Shop {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
}

export enum ShowStopsText {
    Show = "Show Stops",
    Hide = "Hide Stops",
}

export enum ShowPathText {
    Show = "Show Path",
    Hide = "Hide Path",
}

export interface PathRequest {
    shoppingListId: number;
    longitude: number;
    latitude: number;
}

export interface PathResponse {
    shops: Shop[];
    remainingTagsIds: number[];
}