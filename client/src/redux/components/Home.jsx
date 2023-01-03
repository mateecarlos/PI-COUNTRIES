import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContinent, getCountries, orderByName, orderByPopulation, getAllActivities, byActivity } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home () {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1) //La pagina empieza en la 1
    const [countriesPerPage, setCountriesPerPage] = useState(10) //La pagina tiene 10 x Pagina
    const indexOfLastCountry = currentPage * countriesPerPage // ultimo countri en 10 (1 x 10)
    const indexOfFirstCountry =  indexOfLastCountry - countriesPerPage //// primer countri en 0 (10 - 10)
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() =>{
        dispatch(getCountries())
    },[dispatch])

    useEffect(() => {
        dispatch(getAllActivities())
    },[dispatch])


    function handleRecargar(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleByContinent(e){
        dispatch(getContinent(e.target.value))
    }

    function handleByActivity(e){
        e.preventDefault();
        dispatch(byActivity(e.target.value))
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Orden ${e.target.value}`)
    }

    function handleSortPop(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`Orden ${e.target.value}`)
    }


    return (
        <div>
            <button Link to= '/create'>Crear actividades</button>
            <h1> PAGINA DE PAISES </h1>


            <div>
                <SearchBar/>
            </div>
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

                <select onChange={(e) => handleByActivity(e)}>
                        <option value='All'>Actividades</option>
                        {/* {
                            activities.map((el)=> {
                                return (
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            }) */}
                        {/* }  */}
                    </select>


                {
                    currentCountry?.map( (el) => {
                        return( 
                        <Link to = {'/details' + el.id}>
                        <Card name={el.name} continents={el.continents} flag={el.flags} key={el.id}/>
                        </Link>
                        )
                    })
                }

                <div>
                <Paginado 
                countriesPerPage={countriesPerPage} 
                allCountries={allCountries.length} 
                paginado={paginado}/>
                </div>
            </div>
        </div>
    )
}