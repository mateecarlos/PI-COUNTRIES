import axios from 'axios'


export function getSearchName(name) {
    return async function(dispatch) {
        var res = await axios.get(`http://localhost:3001/countries?name=${name}`)
        return dispatch({
            type: 'GET_NAME_COUNTRY',   
            payload: res.data
        })
    } 
}


export function getCountries(){
    return async function(dispatch) {
        var json = await axios.get ("http://localhost:3001/countries")
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        });
    }
}

export function getContinent(payload){
    return {
        type: 'GET_CONTINENT',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPopulation(payload) {
    return {
        type: 'ORDER_BY_POPULATION',
        payload
    }
}
