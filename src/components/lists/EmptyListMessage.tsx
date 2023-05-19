import React from 'react';

const EmptyListMessage = () => {
    return (
        <li className="w-11/12 md:w-1/2 mx-auto text-base md:text-lg px-4 py-2 m-2 bg-violet-100 rounded-md">
            <span className="font-semibold">Oopsie, there are no items here. Possible causes:</span>
            <br/>
            - There is no marked list in  "My Lists" tab.
            <br/>
            - Active list has no items in it.
        </li>
    );
};

export default EmptyListMessage;
