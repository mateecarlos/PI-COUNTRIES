import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getContinent, getCountries, byActivity } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card'

export default function Home () {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    // const activities = useSelector((state) => state.activities )

    useEffect (() =>{
        dispatch(getCountries())
    },[dispatch])

    // useEffect(() => {
    //     dispatch(getActivities())
    // }, [dispatch])

    function handleRecargar(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleByContinent(e){
        dispatch(getContinent(e.target.value))
    }

    // function handleByActivity(e) {
    //     e.preventDefault();
    //     dispatch(byActivity(e.target.value))
    // }

    return (
        <div>
            <Link to= '/create'>Crear actividades</Link>
            <h1> PAGINA DE PAISES </h1>
            <button onClick={e => {handleRecargar(e)}}>
                Recargar paises
            </button>
            <div>
                <select>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'desc'>Descendente</option>
                    <option value = 'popa'>Poblacion ASC</option>
                    <option value = 'popd'>Poblacion DES</option>
                </select>
                <select onChange={e => handleByContinent(e)}>
                    <option value = 'all'>Todo el mundo</option>
                    <option value = 'Asia'>Asia</option>
                    <option value = 'Americas'>Americas</option>
                    <option value = 'Africa'>Africa</option>
                    <option value = 'Antarctic'>Antartida</option>
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Oceania'>Oceania</option>
                </select>
                {/* <select onChange={(e) => handleByActivity(e)}> */}
                <select>
                    <option value = 'All'>Actividades</option>
                    {/* {
                        activities.map((el) => {
                            return(
                                <option key={el.id} value={el.name}>{el.name}</option>
                            )
                        })
                    } */}
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