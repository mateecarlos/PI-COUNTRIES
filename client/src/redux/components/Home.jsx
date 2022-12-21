import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card'

export default function Home () {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)

    useEffect (() =>{
        dispatch(getCountries())
    },[dispatch])

    function handleRecargar(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    return (
        <div>
            <Link to= '/create'>Crear countries</Link>
            <h1> PAGINA DE PAISES </h1>
            <button onClick={e => {handleRecargar(e)}}>
                Recargar paises
            </button>
            <div>
                <select>
                    <option value = 'asc'>ASCENDENTE</option>
                    <option value = 'desc'>DESCEDENTE</option>
                    <option value = 'popa'>POBLACION ASC</option>
                    <option value = 'popd'>POBLACION DES</option>
                </select>
                <select>
                    <option value = 'all'>Mundo</option>
                    <option value = 'Asia'>Asia</option>
                    <option value = 'Americas'>Americas</option>
                    <option value = 'Africa'>Africa</option>
                    <option value = 'Antartic'>Antartida</option>
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Oceania'>Oceania</option>
                </select>
                <select>
                    <option value = 'All'>Actividades</option>
                </select>
                {
                    allCountries?.map( (el) => {
                        return( 
                    <Fragment>
                        <Link to = {'/details' + el.id}>
                        <Card name={el.name} continents={el.continents} flag={el.flags} key={el.id}/>
                        </Link>
                    </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}