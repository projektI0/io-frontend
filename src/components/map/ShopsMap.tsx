import "./ShopsMap.css"
import ShopsMapContent from "./ShopsMapContent";
import {useRef, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {PathRequest, PathResponse, Shop, ShowPathText, ShowStopsText} from './types/types';
import {LatLng} from "leaflet";
import axios from "axios";
import {API_HEADERS} from "../auth/types/types";
import {authHeader} from "../auth/AuthService";
import {useAppSelector} from "../../hooks/hooks";
import ErrorModal from "./ErrorModal";

const examplePathShops: Shop[] = [
    {
        id: 1,
        name: 'Carrefour',
        latitude: 48.864716,
        longitude: 2.349014,
        address: '31 Rue du Faubourg Montmartre, 75009 Paris, France',
    },
    {
        id: 2,
        name: 'IKEA',
        latitude: 59.350503,
        longitude: 18.116183,
        address: 'Barkarbyvägen 11, 177 38 Järfälla, Sweden',
    },
    {
        id: 3,
        name: 'Zara',
        latitude: 40.427738,
        longitude: -3.694062,
        address: 'Calle de Serrano, 23, 28001 Madrid, Spain',
    },
    {
        id: 4,
        name: 'H&M',
        latitude: 59.332552,
        longitude: 18.064657,
        address: 'Drottninggatan 50, 111 21 Stockholm, Sweden',
    }
]

const API_URL: string = import.meta.env.VITE_API_URL;
const styles = {
    map100: {
        width: "100%",
    } as React.CSSProperties,
    map80: {
        width: "80%",
    } as React.CSSProperties,
    stops0: {
        width: "0%",
        display: "none",
    } as React.CSSProperties,
    stops20: {
        width: "20%",
        display: "block",
    } as React.CSSProperties,
}

const ShopsMap = ({userLocation}: { userLocation: LatLng | null }) => {
    const activeListId = useAppSelector(state => state.lists.activeList?.id ?? -1);
    const [path, setPath] = useState<PathResponse | null>(null);
    const [search, setSearch] = useState<string>("");
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
        const data: PathRequest = {
            shoppingListId: activeListId,
            longitude: userLocation?.lng as number,
            latitude: userLocation?.lat as number,
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

                // JUST FOR NOW
                pathResponse.shops = examplePathShops;

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

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setSearch(value);
    };

    if (!userLocation) {
        return (
            <div className="error-message container md:col-span-4 flex flex-col">
                <h1>The site requires access to your location.</h1>
            </div>
        );
    }

    return (
        <div className="container md:col-span-4">
            <div className="search-bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" id="search" name="search" value={search} placeholder="Search for a shop"
                       onChange={handleSearchInputChange}/>
            </div>
            <div className="map-stops-container">
                <MapContainer
                    className="map"
                    style={!showStops ? styles.map100 : styles.map80}
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
                    />
                </MapContainer>
                <div className="stops" style={!showStops ? styles.stops0 : styles.stops20}>
                    <h1>Stops</h1>
                    <ol className="stop-list">
                        {path?.shops?.map((shop, index) => (
                            <li key={index}>{shop.name}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="map-buttons">
                <button type="button" ref={btnStops} onClick={toggleShowStopsText} className="disabled"
                        disabled={!showStopsBtnActive}>
                    {showStopsText}
                </button>
                <button type="button" ref={btnType} onClick={handleChangeType} className="disabled"
                        disabled={!changeTypeBtnActive}>
                    Change Type
                </button>
                <button className={`${activeListId < 0 ? "disabled" : ""}`} type="button" disabled={activeListId < 0}
                        onClick={toggleShowPath}>
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