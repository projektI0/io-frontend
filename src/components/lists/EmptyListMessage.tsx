import React from 'react';

const EmptyListMessage = () => {
    return (
        <li className={"text-lg px-4 py-1 m-2 bg-violet-100 rounded-md"}>
                        <span
                            className={"text-lg font-semibold"}>Oopsie, there are no items here. Possible causes:</span>
            <br/>- there is no marked list in "My lists" tab.
            <br/>- current list has no items in it.
        </li>
    );
};

export default EmptyListMessage;
