import React, {useRef, useState} from "react";
import "./ShopsMap.css"
import ShopsMapContent from "./ShopsMapContent";
import {MapContainer, TileLayer} from "react-leaflet";
import {PathRequest, PathResponse, ShowPathText} from './types/types';
import {LatLng} from "leaflet";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import axios from "axios";
import {API_HEADERS} from "../auth/types/types";
import {authHeader} from "../auth/AuthService";
import {useAppSelector} from "../../hooks/hooks";
import ErrorModal from "./ErrorModal";

const API_URL: string = import.meta.env.VITE_API_URL;

const ShopsMap = ({userLocation}: { userLocation: LatLng | null }) => {
    const activeListId = useAppSelector(state => state.lists.activeList?.id ?? -1);
    const [path, setPath] = useState<PathResponse | null>(null);
    const [showPath, setShowPath] = useState<boolean>(false);
    const [selectedRouteType, setSelectedRouteType] = useState<string>("shortestPath");
    const [showStops, setShowStops] = useState<boolean>(false);
    const [showPathText, setShowPathText] = useState<ShowPathText>(ShowPathText.Show);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const btnType = useRef<HTMLButtonElement>(null);
    const btnStops = useRef<HTMLButtonElement>(null);

    const toggleShowPath = () => {
        setShowPath((showPathText === ShowPathText.Show));
        (showPathText === ShowPathText.Show) ? handleShowPath() : handleHidePath();
    };

    const toggleButtons = () => {
        if (btnStops.current && btnType.current) {
            if (btnStops.current.classList.contains('disabled') && (btnType.current.classList.contains('disabled'))) {
                btnStops.current.classList.remove('disabled');
                btnType.current.classList.remove('disabled');
            } else {
                btnStops.current.classList.add('disabled');
                btnType.current.classList.add('disabled');
            }
        }
    }

    const handleSelectedRouteType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleHidePath()
        setSelectedRouteType(event.target.value);
    }

    const handleShowPath = () => {
        const data: PathRequest = {
            shoppingListId: activeListId,
            longitude: userLocation?.lng as number,
            latitude: userLocation?.lat as number,
            fewestShops: selectedRouteType === "fewestShops",
        }
        axios.post(API_URL + "/path", data, {
            headers: {
                "Content-Type": API_HEADERS['Content-Type'],
                "Accept": API_HEADERS['Accept'],
                "Authorization": authHeader(),
            }
        })
            .then((response) => {
                if (response.status != 200) {
                    setPath(null);
                    setErrorMessage(response.data.message);
                    setShowErrorModal(true);
                    return;
                }

                const pathResponse: PathResponse = response.data;

                if (pathResponse.shops.length === 0) {
                    setPath(null);
                    setErrorMessage("No path for current shopping list.");
                    setShowErrorModal(true);
                    return;
                }
                setPath(pathResponse);
                setShowPathText(ShowPathText.Hide);
                toggleButtons();
            })
            .catch((error) => {
                setPath(null);
                setErrorMessage(error.response.data.message);
                setShowErrorModal(true);
            })
    }

    const handleHidePath = () => {
        setPath(null);
        setShowPath(false)
        setShowStops(false);
        setShowPathText(ShowPathText.Show);
        toggleButtons();
    }

    if (!userLocation) {
        return (
            <div className="error-message container flex flex-col">
                <h1>The site requires access to your location.</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center py-4 px-4 justify-around font-body">
            <div className="map-stops-container lg:min-h-[50%] mb-6 py-3">
                <MapContainer
                    className="map"
                    style={{
                        width: showStops ? "80%" : "100%",
                      }}
                    center={userLocation}
                    zoom={18}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <ShopsMapContent
                        userLocation={userLocation}
                        shopsPath={path?.shops}
                        showPath={showPath}
                    />
                </MapContainer>
                <div className="stops rounded-md"
                      style={{
                        width: showStops ? "20%" : "0%",
                        display: showStops ? "block" : "none"
                      }}
                >
                    <p className="text-md md:text-xl border-b-2 pb-2 font-semibold">Stops</p>
                    <ol className="m-2 p-2 list-decimal text-sm md:text-base">
                        {path?.shops?.map((shop, index) => (
                            <li key={index}>{shop.name}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="map-buttons">
                <button
                    type="button"
                    onClick={() => setShowStops(!showStops)}
                    className={`${!showPath ? "disabled": ""} text-sm md:text-base px-4 py-2 bg-primary text-gray-50 rounded-md mr-2 cursor-pointer hover:opacity-75`}
                >
                    {!showStops ? "Show Stops" : "Hide Stops"}
                </button>
                <select
                    className={`${activeListId < 0 ? "disabled bg-gray-400" : ""} px-4 py-2 text-sm md:text-base bg-primary text-gray-50 rounded-md mr-2 cursor-pointer`}
                    value={selectedRouteType}
                    onChange={handleSelectedRouteType}
                    
                >
                    <option
                        value="shortestPath"
                        selected
                    >
                        Shortest Path
                    </option>
                    <option value="fewestShops">Fewest Shops</option>
                </select>
                <button
                    className={`${activeListId < 0 ? "disabled" : ""} text-sm md:text-base px-4 py-2 bg-primary text-gray-50 rounded-md cursor-pointer hover:opacity-75`}
                    type="button"
                    disabled={activeListId < 0}
                    onClick={toggleShowPath}
                >
                    {showPathText}
                </button>
            </div>
            {showErrorModal &&
                <ErrorModal
                    message={errorMessage}
                    onClose={() => setShowErrorModal(false)}
                />
            }
        </div>
    );
};

export default ShopsMap;