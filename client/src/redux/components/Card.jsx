import React from "react";

export default function Card ({ name, flag, continents }) {
    return (
        <div>
            <img src={flag} alt='notFound' width='150px' height='200px'/>
            <h3>{name}</h3>
            <h5>{continents}</h5>
        </div>
    )
}