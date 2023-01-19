import axios from 'axios' 

//////////// A C T I O N S ///////////////

// Funcion para buscar por nombre
export function getSearchName(name) { // Exporto la funcion getSearchName() que se le pasa un (name)
    return async function(dispatch) { // Retorno la funcion asincrona con el dispatch
    try {
        var res = await axios.get(`http://localhost:3001/countries?name=${name}`) // Creo constante res y guardo en ella el pais traido en la ruta de obtener los paises por nombre
        return dispatch({ // Devuelvo el dispatch de la funcion
            type: 'GET_NAME_COUNTRY',   // el type de la funcion
            payload: res.data      // el payload que es la data del pais buscado
        })
    } catch (error) {
        console.log(error.response.msg)
    }
    } 
}

// Funcion para obtener todos los paises
export function getCountries(){ // Exporto la funcion getCuntries()
    return async function(dispatch) { // Retorno la funcion asincrona con el dispatch
        try {
            var json = await axios.get ("http://localhost:3001/countries") // Creo constante json y guardo en ella todos los paises obtenidos
            return dispatch({ // Devuelvo el dispatch de la funcion
                type: 'GET_COUNTRIES', // el type de la funcion
                payload: json.data // el payload que es la data de todos los paises obtenidos
            });
        } 
        catch(error) {
            console.log(error.response.msg)
        }
        }
}

// Funcion para obtener paises filtrados por una actividad
export function byActivity (payload){ // Exporto la funcion byActiviy() que se le pasa el (payload)
    return { // Retorno 
        type: 'BY_ACTIVITY', // el type de la funcion
        payload // el payload
    }
}

// Funcion para obtener todas las actividades
export function getAllActivities(){ // Exporto la funcion getAllActivities()
    return async function (dispatch){ // Retorno la funcion asincrona con el dispatch
        try {
            var json = await axios.get("http://localhost:3001/activities") // Creo constante json y guardo en ella todas las actividades obtenidas
            return dispatch({ // Devuelvo el dispatch de la funcion
                type: "GET_ACTIVITIES", // el type de la funcion
                payload: json.data // el payload que es la data de todas las actividades
            })
        } catch(error) {
            console.log(error.response.msg)
        }
    }
}

// Fucnion para obtener paises filtrados por continente
export function getContinent(payload){ // Exporto la funcion getContinent() que se le pasa el (payload)
    return { // Retorno
        type: 'GET_CONTINENT', // el type de la funcion
        payload // y el payload
    }
}

// Fucnion para obtener paises ordenado por nombre
export function orderByName(payload) { //Exporto la funcion orderByName() que se le pasa el (payload)
    return { // Retorno
        type: 'ORDER_BY_NAME', // el type de la funcion
        payload // y el payload
    }
}

// Fucnion para obtener paises ordenado por pobalacion
export function orderByPopulation(payload) { //Exporto la funcion orderByPopulation() que se le pasa el (payload)
    return { // Retorno
        type: 'ORDER_BY_POPULATION', // el type de la funcion
        payload // y el payload
    }
}

// Fucnion para obtener el detalle de un pais
export function getDetails(id) { // Exporto la funcion getDetails() que se le pasa el (id)
    return async function (dispatch) { // Reotrno la fucion asincrona con el dispatch
        try {
            const res = await axios.get(`http://localhost:3001/countries/${id}`) // Creo constante res para guardar el pais buscado
            return dispatch ({ // Devuelvo el dispatch de la funcion
                type: 'GET_DETAILS', // el type de la funcion   
                payload: res.data // el payload que es la data del pais buscado por id
            })
        } catch (error) {
            console.log(error.response.msg)
        }
        }
}

// Funcion para crear una actividad
export function postActivity(payload) { // Exporto la funcion postActivity() que se le pasa el (payload)
    return async function(dispatch) { // Retorno la funcion asinrona con el dispatch
        try {
            const res = await axios.post("http://localhost:3001/activities",payload); // Creo constante res para hacer el posrt a /activities con el payload
            return dispatch({ // Devuelvo el dispatch de la fuincion
                type: 'CREATE_ACTIVITY', // el type de la funcion
                payload: res.data, // El payload que es la data que se va pasar para crear la activity
            })
        } catch(error) {
            console.log(error.response.msg)
        }
        }
}
