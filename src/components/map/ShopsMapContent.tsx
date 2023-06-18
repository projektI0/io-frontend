import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Marker, Popup, useMap} from 'react-leaflet';
import {Shop} from './types/types';
import {API_HEADERS} from '../auth/types/types';
import {authHeader} from '../auth/AuthService';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import "./ShopsMapContent.css"

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
    const [blacklistButtonDisabled, setBlacklistButtonDisabled] = useState(false);

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

    const handleAddShopToBlacklist = async (shopId: number) => {
        setBlacklistButtonDisabled(true);
        await axios.post(API_URL + `/shops/blacklist/${shopId}`, null , {
            headers: {
                "Content-Type": API_HEADERS['Content-Type'],
                "Accept": API_HEADERS['Accept'],
                "Authorization": authHeader(),
            }
        }).then((response) => {
            if (response.status != 200) {
                console.error(response)
                return
            }
            if (shops) {
                setShops(shops?.map(shop => shop.id === shopId ? {...shop, blacklist: true} : shop))
            }
        }).catch((error) => {
            console.error(error)
        })
        setBlacklistButtonDisabled(false);
    }

    const handleDeleteShopFromBlacklist = async (shopId: number) => {
        setBlacklistButtonDisabled(true);
        await axios.delete(API_URL + `/shops/blacklist/${shopId}`, {
            headers: {
                "Accept": API_HEADERS['Accept'],
                "Authorization": authHeader(),
            }
        }).then((response) => {
            if (response.status != 200) {
                console.error(response)
                return
            }
            if (shops) {
                setShops(shops?.map(shop => shop.id === shopId ? {...shop, blacklist: false} : shop))
            }
        }).catch((error) => {
            console.error(error)
        })
        setBlacklistButtonDisabled(false);
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
        }
        setRouteControl(routeControl);
    }, [map, showPath, shopsPath]);

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
            {!showPath &&
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
            }
            {shops && shops.map(shop => (
                <Marker 
                    key={shop.id} 
                    position={[shop.latitude, shop.longitude]}
                    icon={shop.blacklist ? 
                        new L.Icon({
                            iconSize: [32, 32],
                            iconUrl:
                            "src/components/map/icons/blackIcon.png",
                        }) :
                        new L.Icon({
                            iconSize: [32, 32],
                            iconUrl:
                            "src/components/map/icons/redIcon.png",
                        })
                    }
                >
                    <Popup position={[shop.latitude, shop.longitude]} closeButton={true} closeOnClick={false}>
                        <div className="shop-info">
                            <h2>{shop.name}</h2>
                            <p>{shop.address}</p>
                            <div>
                                {shop.blacklist ? (
                                    <button 
                                        disabled={blacklistButtonDisabled} 
                                        className={`${blacklistButtonDisabled ? 'disabled' : ''}`}
                                        onClick={() => handleDeleteShopFromBlacklist(shop.id)}
                                    >
                                        Remove from blacklist
                                    </button>
                                ) : (
                                    <button 
                                        disabled={blacklistButtonDisabled} 
                                        className={`${blacklistButtonDisabled ? 'disabled' : ''}`}
                                        onClick={() => handleAddShopToBlacklist(shop.id)}
                                    >
                                        Add to blacklist
                                    </button>
                                )}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

export default ShopsMapContent;

