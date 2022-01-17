import React from "react";

const ErrorMessage = ({ children }) => {
    return (
        <div className="row mt-2 alert alert-danger" role="alert">
            {children}
        </div>
    );
};

export default ErrorMessage;
