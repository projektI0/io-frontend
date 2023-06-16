import React from "react";
import image1 from "../assets/images/active-list.png";
import image2 from "../assets/images/my-lists1.png";
import image3 from "../assets/images/my-lists2.png";
import image4 from "../assets/images/search-products1.png";
import image5 from "../assets/images/map.png";
import image6 from "../assets/images/new-product.png";
import image7 from "../assets/images/profile.png";
import {NavigateFunction, useNavigate} from "react-router-dom";

const Tutorial = () => {
    const navigate: NavigateFunction = useNavigate();

    const handleClose = () => {
        navigate('/profile');
    }

    return (
        <div className="w-full h-5/6 rounded-md">
            <div
                className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative h-3/4 my-6 p-4 mx-auto max-w-3xl overflow-y-auto">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Welcome to the app!
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black text-secondary float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={handleClose}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <p className="my-2 text-slate-500 text-md leading-relaxed">
                                We want to make sure that every user gets the best experience possible, so we prepared a short tutorial describing key features of the app.
                            </p>

                            <p className="my-2 text-slate-500 text-lg leading-relaxed mt-8">
                                <b>1. Active list</b> <br/>
                            </p>
                            <img src={image1} alt={"Active list image"}/>
                            <p className="my-2 text-slate-500 text-md leading-relaxed">
                                In this page we have items that are in your active list.
                                <ul className="ml-2 p-2 list-disc">
                                    <li>You can change their quantity.</li>
                                    <li>Cross out when item is bought.</li>
                                    <li>Remove item from the list.</li>
                                </ul>
                            </p>

                            <p className="my-2 text-slate-500 text-lg leading-relaxed mt-8">
                                <b>2. My Shopping lists</b> <br/>
                            </p>
                            <img src={image2} alt={"Active list image"}/>
                            <p className="my-2 text-slate-500 text-md leading-relaxed">
                                This page contains all your shopping lists.
                                <ul className="ml-2 p-2 list-disc">
                                    <li>Checkbox indicates active user list.</li>
                                    <li>You can edit list by clicking first button.</li>
                                    <li>Also remove whole list when clicking &quot;x&quot; button.</li>
                                </ul>
                                Adding new list is possible by clicking &quot;Add new list&quot; button.
                                <img src={image3} alt={"Active list image"} className={"mt-2"}/>
                            </p>

                            <p className="my-2 text-slate-500 text-lg leading-relaxed mt-8">
                                <b>3. Search products</b> <br/>
                            </p>
                            <img src={image4} alt={"img"}/>
                            <p className="my-2 text-slate-500 text-md leading-relaxed mt-2">
                                When you select a list from &quot;My Shopping Lists&quot; page, you can:
                                <ul className="ml-2 p-2 list-disc">
                                    <li>Add products to it. Simply click checkbox next to the product and item will be added to the list.</li>
                                    <li>Select category tags by clicking on the &quot;Select tags&quot; field.</li>
                                </ul>
                            </p>

                            <p className="my-2 text-slate-500 text-lg leading-relaxed mt-8">
                                <b>4. Map</b> <br/>
                            </p>
                            <img src={image5} alt={"Active list image"}/>
                            <p className="my-2 text-slate-500 text-md leading-relaxed">
                                Map page allows you to find the best route to make your shopping as efficient as possible.
                                <ul className="ml-2 p-2 list-disc">
                                    <li>You can access stops on your route by clicking &quot;Show Stops&quot;.</li>
                                    <li>Routes have many possible variants to personalise user experience, they are accessed in &quot;Change Type&quot;.</li>
                                    <li>Route shows when active list is selected and there are items in it. To show route click &quot;Show Path&quot;.</li>
                                </ul>
                            </p>

                            <p className="my-2 text-slate-500 text-lg leading-relaxed mt-8">
                                <b>5. Adding new shops and products</b> <br/>
                            </p>
                            <img src={image6} alt={"Active list image"}/>
                            <p className="my-2 text-slate-500 text-md leading-relaxed">
                                If product or store is not in our database, you can add it using forms in dedicated pages.
                            </p>

                            <p className="my-2 text-slate-500 text-lg leading-relaxed mt-8">
                                <b>6. Profile</b> <br/>
                            </p>
                            <img src={image7} alt={"Active list image"}/>
                            <p className="my-2 text-slate-500 text-md leading-relaxed">
                                Profile page allows you to check your personal information and also trigger this tutorial again.
                            </p>

                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className={` bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                data-tooltip-id="new-list-name"
                                data-tooltip-content="New list name must be at least 3 characters long"
                                data-tooltip-place="top"
                                type="submit"
                                onClick={() => {handleClose()}}
                                >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
        </div>
    )
};

export default Tutorial;
