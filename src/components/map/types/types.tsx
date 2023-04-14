export interface MapBounds {
    lowerLeft: L.LatLng,
    upperRight: L.LatLng
}

export interface Tag {
    id: number;
    name: string;
    parentTagId?: string;
};

export interface Shop {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    tags: Tag[];
};