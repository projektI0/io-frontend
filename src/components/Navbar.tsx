import React, {useState} from "react";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {getCurrentUser, logout} from "./auth/AuthService";
import {User} from "./auth/types/types";
import {Tooltip} from "react-tooltip";

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const navigate: NavigateFunction = useNavigate();
    const user: User | null = getCurrentUser();

    return (
        <nav className="bg-primary text-bright">
            <div className="w-full lg:w-3/4 mx-auto flex flex-col justify-between">
                <div className="z-10 text-2xl">
                    <div className="pl-6 py-4 pb-4 flex items-center justify-between">
                        <div className={"flex items-center"}>
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
                            <div className="text-xl font-bold text-gray-200 pl-4">
                                Shopping <br /> Manager
                            </div>
                        </div>
                        {!isNavOpen ? (
                            <div
                                className={"pr-10 cursor-pointer md:hidden"}
                                onClick={() => setIsNavOpen((prev) => !prev)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>
                            </div>
                        ) : (
                            <div
                                className="pr-10 cursor-pointer md:hidden"
                                onClick={() => setIsNavOpen((prev) => !prev)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </div>
                        )}
                        <div className={"hidden md:flex"}>
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/active-list"
                                    data-tooltip-id="active-list"
                                    data-tooltip-content="Active list"
                                    data-tooltip-place="bottom"
                                    className="flex text-base items-center p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor"
                                         className="text-secondary w-8 h-8">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>
                                    <Tooltip id="active-list" />
                                </Link>
                            }
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/lists"
                                    data-tooltip-id="my-lists"
                                    data-tooltip-content="My lists"
                                    data-tooltip-place="bottom"
                                    className="flex items-center text-base p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="text-secondary w-8 h-8">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                    </svg>
                                    <Tooltip id="my-lists" />
                                </Link>
                            }
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/products"
                                    data-tooltip-id="search-products"
                                    data-tooltip-content="Search products"
                                    data-tooltip-place="bottom"
                                    className="flex items-center text-base p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-8 h-8 text-secondary">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                    <Tooltip id="search-products" />
                                </Link>
                            }
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/map"
                                    data-tooltip-id="map"
                                    data-tooltip-content="Open map"
                                    data-tooltip-place="bottom"
                                    className="flex items-center text-base p-4 hover:bg-secondary_dark cursor-pointer"
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
                                    <Tooltip id="map" />
                                </Link>
                            }
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/new-product-form"
                                    data-tooltip-id="add-product"
                                    data-tooltip-content="Add new product"
                                    data-tooltip-place="bottom"
                                    className="flex items-center text-base p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="text-secondary w-8 h-8">
                                        <path
                                            d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/>
                                    </svg>
                                    <Tooltip id="add-product"/>
                                </Link>
                            }
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/new-recipe-form"
                                    data-tooltip-id="add-recipe"
                                    data-tooltip-content="Add new recipe"
                                    data-tooltip-place="bottom"
                                    className="flex items-center text-base p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        className="text-secondary w-8 h-8">
                                        <path
                                            d="M19 5h-6V2h-2v3H5C3.346 5 2 6.346 2 8v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.654-1.346-3-3-3zM5 7h14a1 1 0 011 1l.001 3.12c-.896.228-1.469.734-1.916 1.132-.507.45-.842.748-1.588.748-.745 0-1.08-.298-1.587-.747-.595-.529-1.409-1.253-2.915-1.253-1.505 0-2.319.724-2.914 1.253-.507.45-.841.747-1.586.747-.743 0-1.077-.297-1.582-.747-.447-.398-1.018-.905-1.913-1.133V8a1 1 0 011-1zM4 18v-4.714c.191.123.374.274.583.461C5.178 14.276 5.991 15 7.495 15c1.505 0 2.319-.724 2.914-1.253.507-.45.841-.747 1.586-.747s1.08.298 1.587.747c.595.529 1.409 1.253 2.915 1.253s2.321-.724 2.916-1.253c.211-.188.395-.34.588-.464L20.002 18H4z"/>
                                    </svg>
                                    <Tooltip id="add-recipe"/>
                                </Link>
                            }
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/new-shop-form"
                                    data-tooltip-id="add-shop"
                                    data-tooltip-content="Add new shop"
                                    data-tooltip-place="bottom"
                                    className="flex items-center text-base p-4 hover:bg-secondary_dark cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        className="text-secondary w-8 h-8">
                                        <circle cx="10" cy="20.5" r="1"/>
                                        <circle cx="18" cy="20.5" r="1"/>
                                        <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
                                    </svg>
                                    <Tooltip id="add-shop" />
                                </Link>
                            }
                            {user && user.roles.includes("USER") &&
                                <Link
                                    to="/profile"
                                    data-tooltip-id="profile"
                                    data-tooltip-content="Open profile"
                                    data-tooltip-place="bottom"
                                    className="cursor-pointer text-base align-center flex items-center p-4 hover:bg-secondary_dark"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-9 h-9 hover:text-secondary cursor-pointer text-secondary"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <Tooltip id="profile" />
                                </Link>
                            }
                        </div>
                    </div>

                    {/* Mobile navbar */}
                    <div className={`${isNavOpen ? "" : "hidden"} flex flex-col font-semibold text-xl`}>
                        {user && user.roles.includes("USER") &&
                            <Link
                                to="/active-list"
                                className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="text-secondary w-8 h-8">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                </svg>

                                <p className="pl-2 text-lg">Active list</p>
                            </Link>
                        }
                        {user && user.roles.includes("USER") &&
                            <Link
                                to="/lists"
                                className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="text-secondary w-8 h-8">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                </svg>


                                <p className="pl-2 text-lg">My lists</p>
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
                                    className="w-8 h-8 text-secondary">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>

                                <p className="pl-2 text-lg">Search products</p>
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
                                <p className="pl-2 text-lg">Map</p>
                            </Link>
                        }
                        {user && user.roles.includes("USER") &&
                            <Link
                                to="/new-product-form"
                                className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="text-secondary w-8 h-8">
                                    <path
                                        d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/>
                                </svg>

                                <p className="pl-2 text-lg">Add new product</p>
                            </Link>
                        }
                        {user && user.roles.includes("USER") &&
                            <Link
                                to="/new-recipe-form"
                                className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    className="text-secondary w-8 h-8">
                                    <path
                                        d="M19 5h-6V2h-2v3H5C3.346 5 2 6.346 2 8v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.654-1.346-3-3-3zM5 7h14a1 1 0 011 1l.001 3.12c-.896.228-1.469.734-1.916 1.132-.507.45-.842.748-1.588.748-.745 0-1.08-.298-1.587-.747-.595-.529-1.409-1.253-2.915-1.253-1.505 0-2.319.724-2.914 1.253-.507.45-.841.747-1.586.747-.743 0-1.077-.297-1.582-.747-.447-.398-1.018-.905-1.913-1.133V8a1 1 0 011-1zM4 18v-4.714c.191.123.374.274.583.461C5.178 14.276 5.991 15 7.495 15c1.505 0 2.319-.724 2.914-1.253.507-.45.841-.747 1.586-.747s1.08.298 1.587.747c.595.529 1.409 1.253 2.915 1.253s2.321-.724 2.916-1.253c.211-.188.395-.34.588-.464L20.002 18H4z"/>
                                </svg>

                                <p className="pl-2 text-lg">Add new recipe</p>
                            </Link>
                        }
                        {user && user.roles.includes("USER") &&
                            <Link
                                to="/new-shop-form"
                                className="flex items-center p-4 hover:bg-secondary_dark cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    className="text-secondary w-8 h-8">
                                    <circle cx="10" cy="20.5" r="1"/>
                                    <circle cx="18" cy="20.5" r="1"/>
                                    <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
                                </svg>

                                <p className="pl-2 text-lg">Add new shop</p>
                            </Link>
                        }
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
                                    <div className="p-4">
                                        <p className="font-bold text-base mb-2">{user.loginUserDTO.email}</p>
                                        <Link
                                            to="/profile"
                                            className="bg-gray-200 py-0.5 px-1 text-sm font-bold text-primary hover:text-secondary cursor-pointer border-2 rounded-md"
                                        >
                                            View profile
                                        </Link>
                                        <button
                                            className="mx-2 py-0.5 px-1 bg-gray-200 text-sm font-bold text-primary hover:text-secondary border-2 rounded-md"
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
