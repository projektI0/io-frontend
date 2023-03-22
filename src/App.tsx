import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import ShoppingList from "./components/ShoppingList";
import Home from "./components/Home";
import Map from "./components/Map";
import UserProfile from "./components/UserProfile";

const App = () => {
    return (
        <BrowserRouter>
            <div className="App font-body grid md:grid-cols-4">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/lists" element={<ShoppingList />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
