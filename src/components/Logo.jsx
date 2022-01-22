import React from "react";

const Logo = ({ logo = false, addTitleClass = '', addContainerClass = ''}) => {
    const Image = () => {
        if (logo) {
            return <img className="logo_img" src={logo} alt="dish food logo" />;
        }

        return null
    };

    return (
        <div className={`d-flex align-items-end justify-content-center ${addContainerClass}`}>
            <Image />
            <h1 className={ addTitleClass }>Dish App</h1>
        </div>
    );
};

export default Logo;
