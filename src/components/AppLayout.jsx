import React from "react";
import Header from "./Header";

const AppLayout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <div className="container">{props.children}</div>
        </React.Fragment>
    );
};

export default AppLayout;
