const initialState = { // Creo el estado inicial 
    countries : [], // Estado inicial de countries vacio
    allCountries: [], // Estado inicial de allCountries vacio
    activities: [], // Estado inicial de activities vacio
    detail: [], // Estado inicial de detail vacio
}

//////////// R E D U C E R ///////////////

function rootReducer (state = initialState, action) { // Funcion rootReducer se le pasa el state inicial y la action
    switch(action.type) {
        case 'GET_COUNTRIES': 
            return{ 
                ...state, // Guardo el state 
                countries: action.payload, // Al estado inicial de countries le paso el payload de la action
                allCountries: action.payload // Al estado inicial de allCountries le paso el payload de la action
            }

        case "GET_ACTIVITIES":
        return {
            ...state, // Guardo el state 
            activities: action.payload, // Al estado inicial de activities le paso el payload de la action
                };

        case "BY_ACTIVITY":
            const copia = state.allCountries; // Guardo en la contante copia el state de allCountries
            let acti = state.activities; // Guardo en la constante acti el state de activities
            const filterByActivity = // Creo constante para filtrar los paises
            acti.length && action.payload === "All" //Si no hay activiadades creadas
            ? copia.filter((e) => e.activities.length > 0) // Filtrar todos los paises 
            : copia.filter((e) => e.activities.find((a) => a.name === action.payload)) // Filtrar los paises con el name de la actividad pasada en el payload
            if(filterByActivity.length) { // Si hay algo en filterBVyActivity, retornar
            return {
                ...state, // Guardar el state
                countries: filterByActivity, // mostrar los paises filtrados
                };
            } // y si no retornar
            return {
                ...state, // guardar el state
                countries: copia // mostrar todos los paises
            }

        case 'GET_NAME_COUNTRY':
            return {
                ...state, // Guardar el state
                countries: action.payload, // al estado inicial de countries le paso el payload de la action
            }

        case 'GET_CONTINENT':
            const mundo = state.allCountries; // Creo una constante con el state de allCountries
            const filtro =  // Creo constante para filtrar
            action.payload === 'all' // Si no hay continentes
            ? mundo // devuelvo todos los paises del mundo
            : mundo.filter((el) => el.continents === action.payload); // si no los filtro por el continenete deseado
            return {
                ...state, // guardo el state
                countries: filtro, // al state inicial de countriers le paso el filtro para que me devuelva los paises de ese contienente
            }

        case 'ORDER_BY_NAME':
            const sortname = action.payload === 'asc' // creo la constante para filtrar
            ? state.countries.sort(function (a, b) { // si el payload es asc voy a filtrar ascendentemente con el metodo sort()
                if(a.name > b.name) {  // si el name de a es mayor que el de b
                    return 1; // retorno 1
                }
                if(a.name < b.name) { // el name de a es menor que el de b
                    return -1; // retorno -1
                }
                return 0; // sino retorno 0
            }) 
            : state.countries.sort(function (a,b) { // sino hago lo inverso para moverlo para el otro lado
                if(a.name > b.name) {
                    return -1;
                }
                if(a.name < b.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state, // guardo el state
                countries: sortname // al state inicial de countries le paso el filtro para que los ordene
            }

        case 'ORDER_BY_POPULATION':
            const sortpop = action.payload === 'pop' // Este filtro funciona igual que el de alfabeticamente solo que cono la poblacion
            ? state.countries.sort(function (a, b) {
                if(a.population > b.population) {
                    return -1;
                }
                if(a.population < b.population) {
                    return 1;
                }
                return 0;
            })
            : state.countries.sort(function (a, b) {
                if(a.population > b.population) {
                    return 1;
                }
                if(a.population < b.population) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state, // guardo el state
                countries: sortpop // al state inicial de countries le paso el filtro para que ordene por poblacion
            }

        case 'GET_DETAILS':
        return {
            ...state, // guarod el state
            detail: action.payload // al state incial de detail le paso el payload de la action
        }

        case 'CREATE_ACTIVITY':
            return {
                ...state, // guardo el state
            }

        default: // si no hay casos
            return state; // devuelvo el state 
    }
}

export default rootReducer; // exporto el reducer para la store