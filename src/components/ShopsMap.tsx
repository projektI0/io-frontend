import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShopsMap.css"
import { MapContainer , TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface UserPosition {
    longitude: number;
    latitude: number;
}

interface Tag {
    id: number;
    name: string;
    parentTagId?: string;
}

interface Shop {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    tags: Tag[];
}

// Here is some sample data until there is a proper endpoint on the backend side.
const tag1: Tag = {
    id: 1,
    name: "breadstuff"
}

const tag2: Tag = {
    id: 2,
    name: "beverages"
}

const tag3: Tag = {
    id: 3,
    name: "building materials"
}

const tag4: Tag = {
    id: 4,
    name: "engine fuels and lubricants"
}

const shop1: Shop = {
    id: 1,
    name: "ABC Supermarket",
    latitude: 50.049683,
    longitude: 19.944544,
    address: "123 Main Street",
    tags: [tag1, tag2]
};
  
const shop2: Shop = {
    id: 2,
    name: "XYZ Convenience Store",
    latitude: 50.047000,
    longitude: 19.944000,
    address: "456 Broad Avenue",
    tags: [tag1, tag2, tag3, tag4]
};

const pos1: UserPosition = {
    latitude: 50.048500,
    longitude: 19.944500,
};
// End of simple data

function ShopsMap() {
    const [userPosition, setUserPositon] = useState<UserPosition>()
    const [shops, setShops] = useState<Shop[]>()

    useEffect(() => {
        const fetchShops = async () => {
            //   const response = await axios.get("/shops");
            //   setShops(response.data);
            const shops: Shop[] = [shop1, shop2];
            setShops(shops)
        };
        const fetchUserPosition = async () => {
            //   const response = await axios.get("/userposition");
            //   setUserPositon(response.data);
            const position: UserPosition = pos1
            setUserPositon(position)
        };
        
        fetchUserPosition();
        fetchShops();
    }, []);

    if (userPosition && shops) {
        return (
            <MapContainer 
                center={[userPosition.latitude, userPosition.longitude]} 
                zoom={16} 
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker 
                    key={0} 
                    position={[userPosition.latitude, userPosition.longitude]}
                    icon={new L.Icon(
                        {iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png', 
                        iconSize: [32, 32]
                        }
                    )}
                >
                    <Popup position={[userPosition.latitude, userPosition.longitude]}>
                        <div>
                            <h2>You are here</h2>
                        </div>
                    </Popup>
                </Marker>
                {shops.map(shop => (
                    <Marker key={shop.id} position={[shop.latitude, shop.longitude]}>
                        <Popup position={[shop.longitude, shop.latitude]}>
                            <div className="shop-info">
                                <h2>{shop.name}</h2>
                                <p>{shop.address}</p>
                                <ul>
                                    {shop.tags.map(tag => (
                                        <li key={tag.id}>{tag.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        )
    } else {
        return (
            null
        )
    }
};

export default ShopsMap