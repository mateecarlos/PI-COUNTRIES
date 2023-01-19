import React from 'react';
import styles from "./modules/paginado.module.css"

export default function Paginado({countriesPerPage, allCountries, paginado, currentPage}) {

    let pagina = Math.ceil(currentPage===1 ? (allCountries.length - countriesPerPage)/countriesPerPage -1 : allCountries.length/countriesPerPage
    + 0.1);
    const pageNumbers = [];

    for (let i = 1; i <= pagina; i++) {        
        pageNumbers.push(i)        
    }

    return (
        <>
            { 
                pageNumbers && 
                    pageNumbers.map(number => (
                        <button className={styles.paginado} key={number} onClick={() => 
                            paginado(number)}>{number}</button>
                ))
            }
        </>
    )

}