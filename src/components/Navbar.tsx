import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {getCurrentUser, logout} from "./Auth/AuthService";
import {User} from "./Auth/types/types";

const Navbar = () => {
    let navigate: NavigateFunction = useNavigate();

    const user: User | null = getCurrentUser();

    return (
        <nav className="bg-primary text-bright h-screen md:col-span-1 flex min-w-fit">
            <div className="w-full flex flex-col justify-between">
                <div className="mb-6 text-2xl">
                    <div className="pl-4 py-4 pb-10 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="text-secondary w-14 h-14"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                            />
                        </svg>
                        <p className="pl-3 font-bold font-body text-3xl tracking-wide">
                            Shopping manager
                        </p>
                    </div>
                    <div className="flex flex-col font-semibold text-xl">
                        <Link
                            to="/"
                            className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="text-secondary w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </svg>
                            <p className="pl-2 ">Home</p>
                        </Link>
                        <Link
                            to="/current-list"
                            className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="text-secondary w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                            </svg>

                            <p className="pl-2 ">Current list</p>
                        </Link>
                        <Link
                            to="/search-products"
                            className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="text-secondary w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>

                            <p className="pl-2 ">Search products</p>
                        </Link>
                        {user && user.roles.includes("USER") &&
                            <Link
                                to="/map"
                                className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="text-secondary w-8 h-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                                    />
                                </svg>
                                <p className="pl-2">Map</p>
                            </Link>
                        }
                        {user && user.roles.includes("USER") &&
                            <Link
                                to="/lists"
                                className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="text-secondary w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                </svg>


                                <p className="pl-2">My lists</p>
                            </Link>
                        }
                    </div>
                </div>
                <div className="flex items-center p border-t">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-5 w-12 h-12 hover:text-secondary cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    {(user && user.roles.includes("USER"))
                        ? (
                            <div className="p-4 text-lg">
                                <p className="font-bold">{user.loginUserDTO.email}</p>
                                <Link
                                    to="/profile"
                                    className="p-0 text-sm hover:text-secondary cursor-pointer"
                                >
                                    View profile
                                </Link>
                                <button className="mx-5 p-0 text-sm hover:text-secondary cursor-pointer"
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                            window.location.reload();
                                        }}>Log out
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 text-lg">
                                <Link
                                    to="/login"
                                    className="p-0 text-sm hover:text-secondary cursor-pointer"
                                >
                                    Login
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
