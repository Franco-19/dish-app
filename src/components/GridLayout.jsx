import React from "react";

const Gridlayout = (props) => {
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                {props.children}
            </div>
        </div>
    );
};

export default Gridlayout;
