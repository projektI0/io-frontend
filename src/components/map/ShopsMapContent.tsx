import React from 'react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'
import { Marker, useMap, Popup  } from 'react-leaflet';
import { Shop } from './types/types';
import { API_HEADERS } from '../auth/types/types';
import { authHeader } from '../auth/AuthService';
// import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
declare let L: any;

const API_URL: string = import.meta.env.VITE_API_URL;

type ShopsMapContentProps = {
    userLocation: L.LatLng,
    shopsPath: Shop[] | undefined
};

const ShopsMapContent = ({userLocation, shopsPath} : ShopsMapContentProps) => {
    const [shops, setShops] = useState<Shop[]|null>(null);
    
    const map = useMap();

    const updateMap = () => {
        const bounds = map.getBounds();

        const data = {
            lowerLeftLat:  bounds.getSouthWest().lat,
            lowerLeftLng:  bounds.getSouthWest().lng,
            upperRightLat: bounds.getNorthEast().lat,
            upperRightLng: bounds.getNorthEast().lng
        }

        axios.post(API_URL + "/shops/filter", data, { headers: {
            "Content-Type": API_HEADERS['Content-Type'],
            "Accept": API_HEADERS['Accept'],
            "Authorization": authHeader(),
        }})
        .then((response) => {
            if (response.status != 200) {
                setShops(null);
                return;
            }

            setShops(response.data);

            // Get a route from shopsPath
            if (shopsPath) {
                L.Routing.control({
                    waypoints: [
                        L.latLng(userLocation.lat, userLocation.lng),
                        ...shopsPath.map(shop => L.latLng(shop.latitude, shop.longitude))
                    ],
                }).addTo(map);
            }
        }) 
        .catch((error) => {
            setShops(null);
        })
    }

    const onBoundsChange = useCallback(() => {
        updateMap();
    }, [map])

    useEffect(() => {
        updateMap();
    }, [map])

    useEffect(() => {
        map.on("moveend", onBoundsChange);
        map.on("zoomend", onBoundsChange);

        return () => {
            map.off("moveend", onBoundsChange);
            map.off("zoomend", onBoundsChange);
        };
    }, [map, onBoundsChange]);

    return (
        <>
            <Marker
                icon={
                    new L.Icon({
                    iconSize: [32, 32],
                    iconUrl:
                        "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
                    })
                }
                position={userLocation}
            >
                <Popup position={userLocation}>
                    <div>
                        <h2>You are here</h2>
                    </div>
                </Popup>
            </Marker>
            {shops && shops.map(shop => (
                <Marker key={shop.id} position={[shop.latitude, shop.longitude]}>
                    <Popup position={[shop.latitude, shop.longitude]} closeButton={true} closeOnClick={false}>
                        <div className="shop-info">
                            <h2>{shop.name}</h2>
                            <p>{shop.address}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

export default ShopsMapContent;

