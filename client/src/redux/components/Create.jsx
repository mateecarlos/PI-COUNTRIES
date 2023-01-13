import {React, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActivity, getCountries } from "../actions";


function validate(input) {
    let errors= {}
    let dur = Number(input.duration)

    if(!input.name) errors.name = "Campo necesario"
    else if(/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = "Nombre no puedo tener caracteres especiales"

    if(!input.difficulty) errors.difficulty = "Campo necesario"
    else if(dur <= 0 || dur > 24) errors.duration = "La duracion debe ser entre 1 y 24"

    if(!input.season || input.season === "") errors.season = "Campo necesario"

    if(!input.countries) errors.countries = "Campo necesario"

    return errors;
}

export function CreateActivity(){
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries:[]
    })


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e) {
        setInput((estado) => {
            if(e.target.name === "countries") {
                return {
                    ...estado,
                    countries: [...estado.countries, e.target.value]
                }
            } else {
                return {
                    ...estado,
                    [e.target.name] : e.target.value
                }
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
            return alert("Debes completar correctamente el formulario antes de enviarlo.")
        }

        dispatch(postActivity(input))
        alert("Activdad creada correctamente.")
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countries:[]
        })
        history.push("/home")
    }

    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter(con => con !== e)
        })
    }


    useEffect(() => {
        dispatch(getCountries())
    }, [])


    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu Actividad!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input
                    type="text"
                    placeholder="Nombre..."
                    value={input.name}
                    name="name"
                    onChange={(e) => handleSelect(e)}
                    />
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Dificultad (1 a 5): </label>
                    <input
                    type="range" name="difficulty" min="1" max="5" value={input.difficulty} onChange={(e) => handleChange(e)}
                    />
                    {errors.difficulty && (<p>{errors.difficulty}</p>)}
                </div>
                <div>
                    <label>Duracion: </label>
                    <input
                    type="number" placeholder="Duracion de la actividad..." name="duration" value={input.duration} onChange={(e) => handleChange(e)}
                    />
                    {errors.duration && (<p>{errors.duration}</p>)}
                </div>
                <div>
                    <label>Temporada: </label>
                    <select 
                    name='season' 
                    value={input.season}
                    id="season"
                    onChange={(e) => handleSelect(e)} >
                        <option value="" selected disabled>Temporada</option>
                        <option>Verano</option>
                        <option>Otoño</option>
                        <option>Invierno</option>
                        <option>Primavera</option>
                    </select>
                    {errors.season && (<p>{errors.season}</p>)}
                </div>
                <div>
                    <label>Paises: </label>
                    <select name="countries" id="countries" onChange={(e) => handleSelect(e)}>
                        <option selected="false" disabled>Seleccionar pais</option>
                        {
                            countries.map((e) => (
                                <option value={e.id}>{e.name}</option>
                            ))
                        }
                    </select>
                    {errors.countries && (<p>{errors.countries}</p>)}
                </div>
                <div>
                    <button type="submit">Crear Actividad</button>
                </div>
            </form>
            {input.countries.map(e =>
                <div>
                    <p>{e}</p>
                    <button onClick={()=> handleDelete}>X</button>
                </div>)}
        </div>
    )
}


