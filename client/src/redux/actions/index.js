import axios from 'axios'


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

// export function getActivities(){
//     return async function(dispatch) {
//         var json = await axios.get("http://localhost:3001/activities")
//         return dispatch({
//             type: 'GET_ACTIVITIES',
//             payload: json.data
//         })
//     }
// }

// export function byActivity(payload){
//     return {
//         type: 'BY_ACTIVITY',
//         payload
//     }
// }