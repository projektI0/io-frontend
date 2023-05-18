import React, {useState} from "react";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {getCurrentUser, logout} from "./auth/AuthService";
import {User} from "./auth/types/types";

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const navigate: NavigateFunction = useNavigate();
    const user: User | null = getCurrentUser();

    return (
        <nav className="bg-primary text-bright">
            <div className="w-full flex flex-col justify-between md:col-span-1 ">
                <div className="text-2xl">
                    <div className="pl-6 py-4 pb-4 flex items-center justify-between">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12 text-secondary">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                        </svg>
                        <div
                            className="HAMBURGER-ICON space-y-2 pr-10 cursor-pointer"
                            onClick={() => setIsNavOpen((prev) => !prev)}
                        >
                            <span className="block h-0.5 w-8 bg-gray-300 rounded"></span>
                            <span className="block h-0.5 w-8 bg-gray-300 rounded"></span>
                            <span className="block h-0.5 w-8 bg-gray-300 rounded"></span>
                        </div>
                    </div>

                    <div className={isNavOpen ? "showMenuNav" : "hidden"}>
                        <div className="flex flex-col font-semibold text-xl">
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/active-list"
                                    className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="text-secondary w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>

                                    <p className="pl-2 ">Active list</p>
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
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/products"
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
                                            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                        />
                                    </svg>

                                    <p className="pl-2">Products</p>
                                </Link>
                            }
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
                                    to="/new-product-form"
                                    className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="text-secondary w-8 h-8">
                                        <path
                                            d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/>
                                    </svg>

                                    <p className="pl-2">Add new product</p>
                                </Link>
                            }
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/new-shop-form"
                                    className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" strokeWidth={1.5} className="text-secondary w-8 h-8">
                                        <circle cx="10" cy="20.5" r="1"/>
                                        <circle cx="18" cy="20.5" r="1"/>
                                        <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
                                    </svg>

                                    <p className="pl-2">Add new shop</p>
                                </Link>
                            }
                        </div>
                        <div className="flex items-center p border-t">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="ml-5 w-10 h-10 hover:text-secondary cursor-pointer"
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
