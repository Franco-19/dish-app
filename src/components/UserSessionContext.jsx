import React, { createContext, useState } from 'react';
import useLocalStorage from "../useLocalStorage";

const UserSessionContext = createContext();

const UserSessionContextProvider = (props) => {

    const [sessionValue, setSessionValue] = useLocalStorage('sessionValue', {logged: false, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE'});
    
    const [isLogged, setIsLogged] = useState(sessionValue.logged)
    
    return (
        <UserSessionContext.Provider value={{
            isLogged,
            setIsLogged,
            setSessionValue,
            sessionValue
        }}>
            { props.children }
        </UserSessionContext.Provider>
    );
}

export { UserSessionContextProvider, UserSessionContext};
