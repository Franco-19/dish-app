import React from "react";

const Logo = ({ logo }) => {
    return (
        <div className="d-flex align-items-end justify-content-center mb-3">
            <img className="logo_img" src={logo} alt="dish food logo" />
            <h1>Dish App</h1>
        </div>
    );
};

export default Logo;
