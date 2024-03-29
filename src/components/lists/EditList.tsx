import React, {useState} from 'react';
import {MIN_LIST_NAME_LENGTH} from "../../constants/Constants";
import {Tooltip} from "react-tooltip";

type EditListProps = {
    onEditList: (value: string) => void,
    onCloseModal: (value: React.SetStateAction<boolean>) => void,
}

const EditList = (props: EditListProps) => {
    const [editInputValue, setEditInputValue] = useState<string>("")

    const handleEditInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEditInputValue(event.target.value);
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
                                Edit list name
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.onCloseModal(false)}
                            >
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                To rename the list, please enter the new name below.
                            </p>
                            <input type={"text"} onChange={handleEditInputChange}/>
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
                                className={`${editInputValue.length < MIN_LIST_NAME_LENGTH ? "opacity-75" : ""} bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                data-tooltip-id="edit-list-name"
                                data-tooltip-content="New list name must be at least 3 characters long"
                                data-tooltip-place="top"
                                type="submit"
                                disabled={editInputValue.length < MIN_LIST_NAME_LENGTH}
                                onClick={() => {
                                    props.onCloseModal(false);
                                    props.onEditList(editInputValue);
                                }}
                            >
                                Save Changes
                            </button>
                            <Tooltip id="edit-list-name"
                                     className={`${editInputValue.length >= MIN_LIST_NAME_LENGTH ? "hidden" : ""}`}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
        </div>
    );
};

export default EditList;
