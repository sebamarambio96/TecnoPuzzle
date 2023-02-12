import React from 'react'
import { FaGrinBeamSweat } from "react-icons/fa";

export const NotFound = () => {
    return (
        <div className='products d-flex justify-content-center align-items-center container-fluid errorContainer'>
            <div className='relleno'></div>
            <h1 className='fontError'>Ups, parece que te perdiste <FaGrinBeamSweat /></h1>
        </div>
    )
}
