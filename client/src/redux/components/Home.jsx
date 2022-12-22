import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContinent, getCountries, orderByName, orderByPopulation, } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card'

export default function Home () {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    const [orden, setOrden] = useState('')

    useEffect (() =>{
        dispatch(getCountries())
    },[dispatch])


    function handleRecargar(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleByContinent(e){
        dispatch(getContinent(e.target.value))
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setOrden(`Orden ${e.target.value}`)
    }

    function handleSortPop(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setOrden(`Orden ${e.target.value}`)
    }


    return (
        <div>
            <button Link to= '/create'>Crear actividades</button>
            <h1> PAGINA DE PAISES </h1>

            <button onClick={e => {handleRecargar(e)}}>
                Recargar paises
            </button>

            <div>
                <div>
                    <button value = 'asc' onClick={e => handleSortName(e)}>A-Z</button>
                    <button value = 'desc' onClick={e => handleSortName(e)}>Z-A</button>
                    <button value = 'pop' onClick={e => handleSortPop(e)}>Poblacion ↓</button>
                    <button value = 'popd' onClick={e => handleSortPop(e)}>Poblacion ↑</button>
                </div>

                <select onChange={e => handleByContinent(e)}>
                    <option value = 'all'>Todos</option>
                    <option value = 'Asia'>Asia</option>
                    <option value = 'Americas'>Americas</option>
                    <option value = 'Africa'>Africa</option>
                    <option value = 'Antarctic'>Antartida</option>
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Oceania'>Oceania</option>
                </select>

                <select>
                    <option value = 'All'>Todas</option>
                </select>
                {
                    allCountries?.map( (el) => {
                        return( 
                        <Link to = {'/details' + el.id}>
                        <Card name={el.name} continents={el.continents} flag={el.flags} key={el.id}/>
                        </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}