import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <h1>Navbar</h1>
            <div>
                <Link to="/">Home</Link>
                <Link to="/map">Map</Link>
                <Link to="/lists">Lists</Link>
            </div>
        </nav>
    );
};

export default Navbar;
