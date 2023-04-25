import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import CurrentShoppingList from "./components/lists/CurrentShoppingList";
import Home from "./components/Home";
import ShopsMap from "./components/map/ShopsMap";
import UserProfile from "./components/UserProfile";
import LoginForm from "./components/auth/Form/LoginForm";
import RegisterForm from "./components/auth/Form/RegisterForm";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import {useEffect, useState} from "react";
import {LatLng} from "leaflet";
import ShoppingLists from "./components/lists/ShoppingLists";
import ShopForm from "./components/ShopForm/ShopForm";
import ProductForm from "./components/ProductForm/ProductForm";
import ProductList from "./components/Products/ProductList";

const App = () => {
    const [userLocation, setUserLocation] = useState<LatLng|null>(null);

    const updateUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation(new LatLng(position.coords.latitude, position.coords.longitude));
            },
            (error) => {
                setUserLocation(null);
            }
        );

        navigator.geolocation.watchPosition (
            (position) => {
                setUserLocation(new LatLng(position.coords.latitude, position.coords.longitude));
            },
            (error) => {
                setUserLocation(null);
            }
        );
      };

    useEffect(() => {        
        navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
            if (permissionStatus.state === 'denied') {
                setUserLocation(null);
            }

            permissionStatus.onchange = () => {
                if (permissionStatus.state === 'granted') {
                    window.location.reload()
                } else if (permissionStatus.state === 'denied') {
                    setUserLocation(null);
                }
            };
        });

        if (!userLocation) {
            updateUserLocation();
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="App font-body grid md:grid-cols-5">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/map" element={<ProtectedRoute children={<ShopsMap userLocation={userLocation}/>}/>}/>
                    <Route path="/products" element={<ProtectedRoute children={<ProductList/>}/>}/>
                    <Route path="/lists" element={<ProtectedRoute children={<ShoppingLists/>}/>}/>
                    <Route path="/current-list" element={<ProtectedRoute children={<CurrentShoppingList/>}/>}/>
                    <Route path="/new-shop-form" element={<ProtectedRoute children={<ShopForm />}/>}/>
                    <Route path="/new-product-form" element={<ProtectedRoute children={<ProductForm />}/>}/>
                    <Route path="/profile" element={<ProtectedRoute children={<UserProfile />}/>}/>
                    <Route path="/login" element={<LoginForm />}/>
                    <Route path="/register" element={<RegisterForm />}/>
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
