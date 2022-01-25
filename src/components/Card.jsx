import React from "react";

export default function DataCenteredCard({ children, centered = false }) {
    return (
        <div className={`container card shadow-sm border-light py-3 ${centered ? 'login_card position-absolute' : ''}`}>
            { children }
        </div>
    );
}
