import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { UserSessionContext  } from '../components/UserSessionContext';

export default function Home() {

    let navigate = useNavigate();

    const { isLogged } = useContext(UserSessionContext);

    console.log(isLogged);

    useEffect(() => {
        if(!isLogged){
            console.log('el estado del contexto es falso :O')
            navigate('/login')
        }
    });
    return (
        <div>
            {/* Comprobar si estamos con la sesión iniciada primeramente */}
            <Header/>
            We're in home!
        </div>
    )
}
