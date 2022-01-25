import React from "react";

const ErrorMessage = ({ children, addClass }) => {
    return (
        <div className={"row mt-2 alert alert-danger " + addClass} role="alert">
            {children}
        </div>
    );
};

export default ErrorMessage;
