import React from 'react';
import styles from "./modules/paginado.module.css"

export default function Paginado({countriesPerPage, allCountries, paginado}) {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {        
        pageNumbers.push(i)        
    }
    return (
        <>
            { 
                pageNumbers && 
                    pageNumbers.map(number => (
                        <button className={styles.paginado} key={number + Math.random} onClick={() => 
                            paginado(number)}>{number}</button>
                ))
            }
        </>
    )

}