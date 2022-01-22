import React from "react";

const Button = ({
    error = false,
    success = false,
    isLoading = false,
    errorText = "We have an error",
    successText = "Success",
    loadingText = "Loading...",
    text = "Button",
    desing = "primary",
    addClass = "",
    type = "submit",
    id = "",
    onClick = null,
}) => {
    if (error) {
        return (
            <button className="btn btn-danger" type="button" disabled>
                {errorText}
            </button>
        );
    }

    if (success) {
        return (
            <button className="btn btn-success" type="button" disabled>
                {successText}
            </button>
        );
    }

    if (isLoading) {
        return (
            <button className="btn btn-primary" type="button" disabled>
                <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                ></span>
                {loadingText}
            </button>
        );
    }

    return (
        <button
            type={type}
            className={`btn btn-${desing} ${addClass}`}
            id={id}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
