import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import ShoppingList from "./components/ShoppingList";
import Home from "./components/Home";
import Map from "./components/Map";
import UserProfile from "./components/UserProfile";
import LoginForm from "./components/Auth/Form/LoginForm";
import RegisterForm from "./components/Auth/Form/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <BrowserRouter>
            <div className="App font-body grid md:grid-cols-4">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/map" element={<ProtectedRoute children={<Map />}/>}/>
                    <Route path="/lists" element={<ProtectedRoute children={<ShoppingList />}/>}/>
                    <Route path="/profile" element={<ProtectedRoute children={<UserProfile />}/>}/>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
