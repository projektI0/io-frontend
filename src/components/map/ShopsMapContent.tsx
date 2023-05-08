import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Marker, Popup, useMap} from 'react-leaflet';
import {Shop} from './types/types';
import {API_HEADERS} from '../auth/types/types';
import {authHeader} from '../auth/AuthService';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

declare let L: any;

const API_URL: string = import.meta.env.VITE_API_URL;

type ShopsMapContentProps = {
    userLocation: L.LatLng,
    shopsPath: Shop[] | undefined,
    showPath: boolean,
};

const ShopsMapContent = ({userLocation, shopsPath, showPath}: ShopsMapContentProps) => {
    const [shops, setShops] = useState<Shop[] | null>(null);
    const [routeControl, setRouteControl] = useState(null);

    const map = useMap();

    const updateMap = () => {
        const bounds = map.getBounds();

        const data = {
            lowerLeftLat: bounds.getSouthWest().lat,
            lowerLeftLng: bounds.getSouthWest().lng,
            upperRightLat: bounds.getNorthEast().lat,
            upperRightLng: bounds.getNorthEast().lng
        }

        axios.post(API_URL + "/shops/filter", data, {
            headers: {
                "Content-Type": API_HEADERS['Content-Type'],
                "Accept": API_HEADERS['Accept'],
                "Authorization": authHeader(),
            }
        }).then((response) => {
            if (response.status != 200) {
                setShops(null);
                return;
            }
            setShops(response.data);
        }).catch((error) => {
            setShops(null);
        })
    }

    const onBoundsChange = useCallback(() => {
        updateMap();
    }, [map])

    useEffect(() => {
        updateMap();
        let routeControl = null;
        if (shopsPath && showPath) {
            const firstWaypoint = L.latLng(userLocation.lat, userLocation.lng);
            const waypoints = [
                firstWaypoint,
                ...shopsPath.map(shop => L.latLng(shop.latitude, shop.longitude))];

            routeControl = L.Routing.control({
                waypoints: waypoints
            }).addTo(map);

            L.marker(firstWaypoint, {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                    iconSize: [48, 48],
                    iconAnchor: [24, 48],
                    popupAnchor: [0, -82],
                })
            }).addTo(map);
        }
        setRouteControl(routeControl);
    }, [map, showPath]);

    useEffect(() => {
        // Remove route control when showPath becomes false
        if (!showPath && routeControl !== null) {
            map.removeControl(routeControl);
            setRouteControl(null);
        }
    }, [showPath])


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

