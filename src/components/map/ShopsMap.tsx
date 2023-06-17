import React from "react";
import "./ShopsMap.css"
import ShopsMapContent from "./ShopsMapContent";
import {useRef, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {PathRequest, PathResponse, Shop, ShowPathText, ShowStopsText} from './types/types';
import L,  {LatLng} from "leaflet";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import axios from "axios";
import {API_HEADERS} from "../auth/types/types";
import {authHeader} from "../auth/AuthService";
import {useAppSelector} from "../../hooks/hooks";
import ErrorModal from "./ErrorModal";

const API_URL: string = import.meta.env.VITE_API_URL;
const examplePathShops: Shop[] = [
    {
        "id": 1,
        "name": "Lewiatan Market",
        "longitude": 19.9683061,
        "latitude": 50.0880206,
        "address": "31-416 Kraków, Dobrego Pasterza 100"
    },
    {
        "id": 2,
        "name": "Dom Aukcyjny Rempex",
        "longitude": 19.9352877,
        "latitude": 50.0626174,
        "address": "None Kraków, Jagiellońska 6A"
    },
    {
        "id": 3,
        "name": "Pasieka",
        "longitude": 19.9361546,
        "latitude": 50.0636209,
        "address": "31-011 Kraków, Plac Szczepański 8"
    },
    {
        "id": 4,
        "name": "Wawel",
        "longitude": 19.9362679,
        "latitude": 50.0623496,
        "address": "None Kraków, Rynek Główny 33"
    }
]

const ShopsMap = ({userLocation}: { userLocation: LatLng | null }) => {
    const activeListId = useAppSelector(state => state.lists.activeList?.id ?? -1);
    const [path, setPath] = useState<PathResponse | null>(null);
    const [showPath, setShowPath] = useState<boolean>(false);
    const [showStops, setShowStops] = useState<boolean>(false);
    const [changeTypeBtnActive, setChangeTypeBtnActive] = useState<boolean>(false);
    const [showStopsBtnActive, setShowStopsBtnActive] = useState<boolean>(false);
    const [showStopsText, setShowStopsText] = useState<ShowStopsText>(ShowStopsText.Show);
    const [showPathText, setShowPathText] = useState<ShowPathText>(ShowPathText.Show);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const btnType = useRef<HTMLButtonElement>(null);
    const btnStops = useRef<HTMLButtonElement>(null);

    const toggleShowStopsText = () => {
        (showStopsText === ShowStopsText.Show) ? handleShowStops() : handleHideStops();
        setShowStopsText((showStopsText === ShowStopsText.Show) ? ShowStopsText.Hide : ShowStopsText.Show);
    };

    const toggleShowPath = () => {
        setShowPath((showPathText === ShowPathText.Show));
        (showPathText === ShowPathText.Show) ? handleShowPath() : handleHidePath();
    };

    const toggleButtons = () => {
        if (btnStops.current && btnType.current) {
            if (btnStops.current.classList.contains('disabled') && (btnType.current.classList.contains('disabled'))) {
                setShowStopsBtnActive(true)
                btnStops.current.classList.remove('disabled');
                setChangeTypeBtnActive(true);
                btnType.current.classList.remove('disabled');
            } else {
                setShowStopsText(ShowStopsText.Show);
                setShowStopsBtnActive(false);
                btnStops.current.classList.add('disabled');
                setChangeTypeBtnActive(false);
                btnType.current.classList.add('disabled');
            }
        }
    }

    const handleShowPath = () => {
        // TODO: uncomment when tags on backend are ready (1).
        // const data: PathRequest = {
        //     shoppingListId: activeListId,
        //     longitude: userLocation?.lng as number,
        //     latitude: userLocation?.lat as number,
        // }
        // axios.post(API_URL + "/path", data, {
        //     headers: {
        //         "Content-Type": API_HEADERS['Content-Type'],
        //         "Accept": API_HEADERS['Accept'],
        //         "Authorization": authHeader(),
        //     }
        // })
        //     .then((response) => {
        //         if (response.status != 200) {
        //             setPath(null);
        //             setErrorMessage(response.data.message);
        //             setShowErrorModal(true);
        //             return;
        //         }
        //
        //         const pathResponse: PathResponse = response.data;
        //
        //         // JUST FOR NOW
        //         pathResponse.shops = examplePathShops;
        //
        //         if (pathResponse.shops.length === 0) {
        //             setPath(null);
        //             setErrorMessage("No path for current shopping list.");
        //             setShowErrorModal(true);
        //             return;
        //         }
        //
        //         setPath(pathResponse);
        //         setShowPathText(ShowPathText.Hide);
        //         toggleButtons();
        //     })
        //     .catch((error) => {
        //         setPath(null);
        //         setErrorMessage(error.response.data.message);
        //         setShowErrorModal(true);
        //     })
        const pathResponse: PathResponse = {
            shops: examplePathShops,
            remainingTagsIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }
        setPath(pathResponse);
        setShowPathText(ShowPathText.Hide);
        toggleButtons();
    }

    const handleHidePath = () => {
        setPath(null);
        setShowPath(false)
        setShowStops(false);
        setShowPathText(ShowPathText.Show);
        toggleButtons();
    }

    const handleShowStops = () => {
        setShowStops(true);
    }

    const handleHideStops = () => {
        setShowStops(false);
    }

    const handleChangeType = () => {
        // TODO: Change type of path
    };

    if (!userLocation) {
        return (
            <div className="error-message container md:col-span-4 flex flex-col">
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
                        // TODO: uncomment when tags on backend are ready (2).
                        // shopsPath={path?.shops}
                        shopsPath={examplePathShops}
                        showPath={showPath}
                    />
                </MapContainer>
                <div className="stops" 
                      style={{
                        width: showStops ? "20%" : "0%",
                        display: showStops ? "block" : "none"
                      }}
                >
                    <h1>Stops</h1>
                    <ol className="stop-list">
                        {path?.shops?.map((shop, index) => (
                            <li key={index}>{shop.name}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="map-buttons">
                <button
                    type="button"
                    ref={btnStops}
                    onClick={toggleShowStopsText}
                    className="disabled text-sm md:text-base"
                    disabled={!showStopsBtnActive}
                >
                    {showStopsText}
                </button>
                <button
                    type="button" ref={btnType}
                    onClick={handleChangeType}
                    className="disabled text-sm md:text-base"
                    disabled={!changeTypeBtnActive}
                >
                    Change Type
                </button>
                <button
                    className={`${activeListId < 0 ? "disabled" : ""} text-sm md:text-base`}
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