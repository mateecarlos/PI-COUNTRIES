import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";


export function CreateActivity(){
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        idPais:[]
    })

    useEffect(() => {
        dispatch(getCountries())
    }, [])


    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu Actividad!</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input
                    type="text"
                    placeholder="Nombre..."
                    value={input.name}
                    name="name"
                    />
                </div>
                <div>
                    <label>Dificultad:</label>
                    <input
                    type="range" name="difficulty" min="1" max="5" value={input.difficulty}
                    />
                </div>
                <div>
                    <label>Duracion:</label>
                    <input
                    type="text" placeholder="Duracion de la actividad..." name="duration" value={input.duration}
                    />
                </div>
                <div>
                    <label>Temporada:</label>
                    <select 
                    name='season' 
                    value={input.season} >
                        <option value="" selected disabled>Temporada</option>
                        <option>Verano</option>
                        <option>Otoño</option>
                        <option>Invierno</option>
                        <option>Primavera</option>
                    </select>
                </div>
                <div>
                    <label>Paises:</label>
                    <select>
                        <option selected="false" disabled>Seleccionar pais</option>
                        {
                            countries.map((e) => (
                                <option value={e.id}>{e.name}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}


