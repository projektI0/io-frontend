import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import ActiveShoppingList from "./components/lists/ActiveShoppingList";
import ShopsMap from "./components/map/ShopsMap";
import UserProfile from "./components/UserProfile";
import LoginForm from "./components/auth/Form/LoginForm";
import RegisterForm from "./components/auth/Form/RegisterForm";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import {useEffect, useState} from "react";
import {LatLng} from "leaflet";
import ShoppingLists from "./components/lists/ShoppingLists";
import ProductList from "./components/products/ProductList";
import ShopForm from "./components/shopForm/ShopForm";
import ProductForm from "./components/productForm/ProductForm";
import Footer from "./components/Footer";

const App = () => {
    const [userLocation, setUserLocation] = useState<LatLng | null>(null);

    const updateUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation(new LatLng(position.coords.latitude, position.coords.longitude));
            },
            (error) => {
                setUserLocation(null);
            }
        );

        navigator.geolocation.watchPosition(
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
            .query({name: "geolocation"})
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
            <div className="App font-body h-screen flex flex-col justify-between">
                <div>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute children={<Navigate to="/active-list" replace/>}/>}/>
                        <Route path="/map" element={<ProtectedRoute children={<ShopsMap userLocation={userLocation}/>}/>}/>
                        <Route path="/products" element={<ProtectedRoute children={<ProductList/>}/>}/>
                        <Route path="/lists" element={<ProtectedRoute children={<ShoppingLists/>}/>}/>
                        <Route path="/active-list" element={<ProtectedRoute children={<ActiveShoppingList/>}/>}/>
                        <Route path="/new-shop-form" element={<ProtectedRoute children={<ShopForm/>}/>}/>
                        <Route path="/new-product-form" element={<ProtectedRoute children={<ProductForm/>}/>}/>
                        <Route path="/profile" element={<ProtectedRoute children={<UserProfile/>}/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
};

export default App;
