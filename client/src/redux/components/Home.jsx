import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContinent, getCountries, orderByName, orderByPopulation, getAllActivities, byActivity } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./modules/home.module.css"

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
        setCurrentPage(1)
    }

    function handleByContinent(e){
        dispatch(getContinent(e.target.value))
        setCurrentPage(1)
    }

    function handleByActivity(e){
        e.preventDefault();
        dispatch(byActivity(e.target.value))
        setCurrentPage(1)
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

    console.log(activities)
    return (
        <div className={styles.container}>

            {/*  //////////// TITULO Y RECARGAR ////////////  */}
                <h1 className={styles.title}> COUNTRIES </h1>
            <div className={styles.primeros}>
                <button className={styles.recargar} onClick={e => {handleRecargar(e)}}>
                    Reload Countries
                </button>

                {/*  //////////// BUSCADOR ////////////  */}
                <div className={styles.buscador}>
                    <SearchBar
                    setCurrentPage={setCurrentPage}
                    />
                </div>

            {/*  //////////// CREAR ACTIVIDADES ////////////  */}
                <div>
                    <Link to='/create'><button className={styles.create}>Create Activity</button></Link>
                </div>
            </div>
            

            {/*  //////////// NAV ////////////  */}
            <nav className={styles.nav}>

                {/*  //////////// FILTRO POBLACION ////////////  */}
                <div className={styles.sort}>
                    <button className={styles.sort1} value = 'asc' onClick={e => handleSortName(e)}>A-Z</button>
                    <button className={styles.sort1} value = 'desc' onClick={e => handleSortName(e)}>Z-A</button>
                    <button className={styles.sort2} value = 'pop' onClick={e => handleSortPop(e)}>Population ↓</button>
                    <button className={styles.sort2} value = 'popd' onClick={e => handleSortPop(e)}>Population ↑</button>
                </div>

                {/*  //////////// FILTRO CONTINENTE ////////////  */}
                <div className={styles.filtro}>
                <select className={styles.filtro1} onChange={e => handleByContinent(e)}>
                    <option className={styles.opciones} value = "" selected disabled>Sort by Continent</option>
                    <option value = 'all'>All</option>
                    <option value = 'Asia'>Asia</option>
                    <option value = 'Americas'>Americas</option>
                    <option value = 'Africa'>Africa</option>
                    <option value = 'Antarctic'>Antartida</option>
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Oceania'>Oceania</option>
                </select>

                {/*  //////////// FILTRO ACTIVIDADES ////////////  */}
                <select className={styles.filtro2} onChange={e => handleByActivity(e)}>
                        <option value='All' selected disabled>Sort by Activity</option>
                        {
                            activities?.map((e)=> {
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                    )
                                })}
                </select>
                </div>
            </nav>

                {/*  //////////// PAISES ////////////  */}
                <div className={styles.areapaises}>
                    {
                        currentCountry ? currentCountry.map((el) => {
                            return (
                                <div key={el.id}>
                                    <Link to={'/details/' + el.id}>
                                        <Card 
                                        name={el.name} 
                                        flag={el.flags} 
                                        continents={el.continents} 
                                        key={el.id}/>
                                    </Link>
                                </div>
                            )
                        }) :
                        <div>
                            <Link to={'/details/' + allCountries.id}>
                                <Card 
                                    name={allCountries.name}
                                    flag={allCountries.flag} 
                                    continents={allCountries.continents} 
                                    key={allCountries.id}>
                                </Card>
                            </Link>
                        </div>
                    }
                </div>
                
                {/*  //////////// PAGINADO ////////////  */}
                <div className={styles.paginado}>
                <Paginado
                countriesPerPage={countriesPerPage} 
                allCountries={allCountries.length} 
                paginado={paginado}/>
                </div>
        </div>
    )
}