import React from "react";

export default function Card ({ name, flag, continents }) {
    return (
        <div>
            <img src={flag} alt='notFound' width='250px' height='150px'/>
            <h4>{name}</h4>
            <h5>{continents}</h5>
        </div>
    )
}