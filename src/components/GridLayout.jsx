import React from "react";

const Gridlayout = (props) => {
    return (
        <div className={"row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center " + props.addClass}>
            {props.children}
        </div>
    );
};

export default Gridlayout;
