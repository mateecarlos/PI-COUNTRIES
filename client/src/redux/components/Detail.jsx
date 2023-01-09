
import React from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { getDetails } from "../actions";
import { useEffect } from "react";

export default function GetDetailsCountry(props){
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
    }, [])

    const myCountry = useSelector((state) => state.detail)

    return (
        <div>
            {
                myCountry ?
                <div>
                    <img src={myCountry.flags} alt='country'/>
                    <h1>{myCountry.name}</h1>
                    <div>
                        <div>
                            <h4>Id: {myCountry.id}</h4>
                            <h4>Continente: {myCountry.continents}</h4>
                            <h4>Capital: {myCountry.capital}</h4>
                            <h4>Subregion: {myCountry.subregion}</h4>
                            <h4>Area: {myCountry.area}</h4>
                            <h4>Población: {myCountry.population}</h4>
                            <Link to= '/home' ><button>Return</button></Link>
                        </div> 
                        <div>
                            <h3>ACTIVIDADES DEL PAIS</h3>
                            {
                                myCountry.Activity && myCountry.Activity.length ?
                                myCountry.Activity.map(e => {
                                    return (
                                            <div>
                                                <h4>{e.name}</h4>
                                                <p>Dificultad: {e.difficulty}</p>
                                                <p>Duración: {e.duration} horas</p>
                                                <p >Temporada: {e.season}</p>
                                            </div>
                                            
                                        ) 
                                    }) 
                                    : <p>No existen actividades en este país</p> 
                            }
                        </div>
                    </div>
                </div> 
                : <div>
                    <img src="https://i.pinimg.com/originals/76/59/35/7659353c8fcde74a4c224dafd7a5eccf.gif" alt="country" />
                    <p>Loading...</p> 
                </div>
            }
            
        </div>
    )
}