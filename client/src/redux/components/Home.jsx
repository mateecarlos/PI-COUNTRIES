import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContinent, getCountries, orderByName, orderByPopulation, getAllActivities, byActivity } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./modules/home.module.css"

export default function Home () { // Exporto la funcion Home()

    const dispatch = useDispatch(); // Creo la constante para el dispatch
    
    const allCountries = useSelector((state) => state.countries) // Creo la constante para el useSelector  de countries(mostrar info)
    const activities = useSelector((state) => state.activities) // Creo la constante para el useSelector de activities (mostrar info)

    const [orden, setOrden] = useState('') // useState para el orden

    const [currentPage, setCurrentPage] = useState(1) //La pagina empieza en la 1
    const [countriesPerPage, setCountriesPerPage] = useState(9) //La pagina tiene 10 x Pagina
    const indexOfLastCountry = currentPage===1 ? currentPage * countriesPerPage : currentPage * countriesPerPage -1; // ultimo countri en 10 (1 x 10)
    const indexOfFirstCountry =  indexOfLastCountry - countriesPerPage //// primer country en 0 (10 - 10)
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
        pageNumber === 1 ? setCountriesPerPage(9) : setCountriesPerPage(10)
    }

    // Funcion para dispachat la action que me trae los paises
    useEffect (() =>{ // El primer valor es para definir el comportamiento de la funcion
        dispatch(getCountries()) // Dispacha la action para obtener los paises
    },[dispatch]) // como segundo valor le paso el dispatch para que cada vez que se actualice el state se ejecute el useEffect

    // Funcion para dipachar la action que me trae las actividades
    useEffect(() => { // El primer valor es para definir el comportamiento de la funcion
        dispatch(getAllActivities()) // Dispacha la action para obtener las actividades
    },[dispatch]) // como segundo valor le paso el dispatch para que cada vez que se actualice el state se ejecute el useEffect

    // Funcion para recargar los paises y filtros
    function handleRecargar(){  // Funcion para recargar
        // e.preventDefault(); // Cancela si es cancelable
        dispatch(getCountries()); // Dispacha la accion getCountries() para obtener todos los countries
        setCurrentPage(1) // Seteo la pagina en la 1
        setCountriesPerPage(9)
    }

    // Funcion para filtrar por continente
    function handleByContinent(e){ // Funcion por continente
        dispatch(getContinent(e.target.value)) // Dispacho la accion getContinent() para filtrar los paises por contienente pasado en el value
        setCurrentPage(1) // Seteo la pagina en la 1
    }

    // Funcion para filtrar por activity
    function handleByActivity(e){ // Funcion por acitivity
        e.preventDefault(); // Cancela si es cancelable
        dispatch(byActivity(e.target.value)) // Dispacho la accion byActivity() para filtrar los paises por actividad pasada en el value
        setCurrentPage(1) // Sereo la pagina en la 1
    }

    // Funcion para ordenar por Nombre
    function handleSortName(e){ // Funcion por nombre
        e.preventDefault(); // Cancela si es cancelable
        dispatch(orderByName(e.target.value)) // Dispacho la accion orderByName() para ordenar los paises por nombre asc o desc
        setCurrentPage(1) // Seteo la pagina en la 1 
        setOrden(`Orden ${e.target.value}`) // Setea orden en el value
    }

    // Funcion para ordenar por poblacion
    function handleSortPop(e){ // Funcion por poblacion
        e.preventDefault(); // Cancela si es cancelable
        dispatch(orderByPopulation(e.target.value)) // Dispacho la accion orderByPopulation() para ordenar los paises por poblacion asc o desc
        setCurrentPage(1) // Seteo la pagina en la 1 
        setOrden(`Orden ${e.target.value}`) // Setea orden en el value
    }

    return (
        <div className={styles.container}>

            {/*  //////////// TITULO Y RECARGAR ////////////  */}
                <h1 className={styles.title}> COUNTRIES </h1>
            <div className={styles.primeros}>
                <button className={styles.recargar} onClick= {() => handleRecargar()}>
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
                allCountries={allCountries} 
                paginado={paginado}/>
                </div>
        </div>
    )
}