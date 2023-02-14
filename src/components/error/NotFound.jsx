import React from 'react'
import { FaGrinBeamSweat } from "react-icons/fa";

export const NotFound = () => {
    return (
        <div className='products d-flex justify-content-center align-items-center container-fluid errorContainer'>
            <div className='relleno'></div>
            <h1 className='fontError text-warning'>Ups, parece que te has perdido <FaGrinBeamSweat/></h1>
        </div>
    )
}
