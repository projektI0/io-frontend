import React from 'react';

const EmptyListMessage = () => {
    return (
        <li className="text-lg px-4 py-1 m-2 bg-violet-100 rounded-md">
            <span className="font-semibold">Oopsie, there are no items here. Possible causes:</span>
            <br/>
            - There is no marked list in "My Lists" tab.
            <br/>
            - Current list has no items in it.
        </li>
    );
};

export default EmptyListMessage;
