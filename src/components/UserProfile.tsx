import React from 'react';
import {User} from "./auth/types/types";
import {getCurrentUser, logout} from "./auth/AuthService";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";

const UserProfile = () => {
    const user: User | null = getCurrentUser();
    const navigate: NavigateFunction = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="md:col-span-4 flex flex-col justify-center items-center font-body text-primary">
            <h1 className="p-10 text-2xl text-primary font-bold">User Profile</h1>
            <div className="flex items-center p border-t">
                {user && user.roles.includes("USER") ? (
                    <div className="flex p-4">
                        <p className="font-bold text-lg mb-1">{user.loginUserDTO.email}</p>
                        <button
                            className="mx-4 py-0.5 px-1 bg-gray-200 text-sm font-bold text-primary hover:text-secondary border-2 rounded-md"
                            onClick={() => {
                                handleLogout()
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
    );
};

export default UserProfile;
