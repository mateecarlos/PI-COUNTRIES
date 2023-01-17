import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchName } from "../actions";
import styles from "./modules/searchbar.module.css"

export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getSearchName(name))
        setCurrentPage(1)
    }


    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input className={styles.input} type='text' value={name} placeholder='Country...' onChange={e => handleInputChange(e)}></input>
                <button className={styles.buton} type="submit">Search</button>
            </form>
        </div>
    )
}