import React, {useState} from 'react';
import {MIN_LIST_NAME_LENGTH} from "../../constants/Constants";
import {Tooltip} from "react-tooltip";

type AddListProps = {
    onAddList: (value: string) => void,
    onCloseModal: (value: React.SetStateAction<boolean>) => void,
}

const AddList = (props: AddListProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value)
    };

    return (
        <div>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add new list
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.onCloseModal(false)}>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                To add new list, please enter the name of the list below.
                            </p>
                            <input type={"text"} onChange={handleInputChange}/>
                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button" onClick={() => props.onCloseModal(false)}>
                                Close
                            </button>
                            <button
                                className={`${inputValue.length < MIN_LIST_NAME_LENGTH ? "opacity-75" : ""} bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                data-tooltip-id="new-list-name"
                                data-tooltip-content="New list name must be at least 3 characters long"
                                data-tooltip-place="top"
                                type="submit"
                                disabled={inputValue.length < MIN_LIST_NAME_LENGTH}
                                onClick={() => {
                                    props.onCloseModal(false)
                                    props.onAddList(inputValue)
                                }}>
                                Save Changes
                            </button>
                            <Tooltip id="new-list-name"
                                     className={`${inputValue.length >= MIN_LIST_NAME_LENGTH ? "hidden" : ""}`}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
        </div>
    );
};

export default AddList;
