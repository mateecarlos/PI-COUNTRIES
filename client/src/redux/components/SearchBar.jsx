import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchName } from "../actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getSearchName(name))
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={name} placeholder='País...' onChange={e => handleInputChange(e)}></input>
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}