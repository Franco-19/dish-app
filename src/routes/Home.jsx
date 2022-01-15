import React from 'react'
import Header from '../components/Header'

export default function Home() {
    return (
        <div>
            {/* Comprobar si estamos con la sesión iniciada primeramente */}
            <Header/>
            We're in home!
        </div>
    )
}
