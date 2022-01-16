import React from "react";

export default function DataCenteredCard({ children }) {
    return (
        <div className="container card login_card position-absolute shadow-sm border-light py-3">
            { children }
        </div>
    );
}
