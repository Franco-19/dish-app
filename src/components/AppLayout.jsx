import React from 'react';
import Header from './Header';

const AppLayout = (props) => {
    return (
        <React.Fragment>
            <Header />
            { props.children }
        </React.Fragment>
    );  
}

export default AppLayout;
