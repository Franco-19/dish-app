import React from "react";

const KeyValueTitle = ({keyName, value, unit = ''}) => {
    return (
        <p>
            <span className="text-decoration-underline">{keyName}</span>: {value} {unit}
        </p>
    );
};

export default KeyValueTitle;
