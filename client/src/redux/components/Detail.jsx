import React from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { getDetails } from "../actions";
import { useEffect } from "react";
import styles from "./modules/detail.module.css"

export default function GetDetailsCountry(props){
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
    },[])

    const myCountry = useSelector((state) => state.detail)

    return (
        <div className={styles.container}>
            {
                myCountry ?
                <div className={styles.container2} key={myCountry.id}>
                    <Link to= '/home' ><button className={styles.boton}>Home 🚪</button></Link>
                    <img className={styles.img} src={myCountry.flags} alt='country'/>
                    <h1 className={styles.name}>{myCountry.name}</h1>
                    <div className={styles.infoact}>
                        <div className={styles.informacion}>
                            <h4 className={styles.id}>Code: {myCountry.id}</h4>
                            <h4 className={styles.continent}>Continent: {myCountry.continents}</h4>
                            <h4 className={styles.capital}>Capital: {myCountry.capital}</h4>
                            <h4 className={styles.subregion}>Subregion: {myCountry.subregion}</h4>
                            <h4 className={styles.area}>Area: {myCountry.area} km²</h4>
                            <h4 className={styles.poblacion}>Population: {myCountry.population}</h4>
                        </div> 
                            <h3 className={styles.titleactividades} >COUNTRY ACTIVITIES</h3>
                        <div className={styles.contenedor}>
                            {
                                myCountry.activities && myCountry.activities.length ?
                                myCountry.activities.map(e => {
                                    return (
                                            <div className={styles.actividad} key={e.id}>
                                                <h4 className={styles.aname}>{e.name}</h4>
                                                <p className={styles.adificultad}>Difficulty: {e.difficulty}</p>
                                                <p className={styles.aduracion}>Duration: {e.duration} horas</p>
                                                <p className={styles.atemporada}>Season: {e.season}</p>
                                            </div>
                                            
                                        ) 
                                    }) 
                                    : <p className={styles.p}>There are no activities in this country</p> 
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