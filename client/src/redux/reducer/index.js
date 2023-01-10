const initialState = {
    countries : [],
    allCountries: [],
    activities: [],
    detail: [],
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case "GET_ACTIVITIES":
        return {
            ...state,
            activities: action.payload,
                };

        case "BY_ACTIVITY":
            const copia = state.allCountries;
            const acti = state.activities;
            const filterByActivity =
                action.payload === "All"
                    ? copia
                    : acti
                        .filter((a) => a.name === action.payload)[0]
                        .countries.map((e) => e);
            return {
                ...state,
                countries: filterByActivity,
                };

        case 'GET_NAME_COUNTRY':
            return {
                ...state,
                countries: action.payload,
            }

        case 'GET_CONTINENT':
            const mundo = state.allCountries;
            const filtro = 
            action.payload === 'all'
            ? mundo
            : mundo.filter((el) => el.continents === action.payload);
            return {
                ...state,
                countries: filtro,
            }

        case 'ORDER_BY_NAME':
            const sortname = action.payload === 'asc'
            ? state.countries.sort(function (a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(a.name < b.name) {
                    return -1;
                }
                return 0;
            }) 
            : state.countries.sort(function (a,b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(a.name < b.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries: sortname
            }

        case 'ORDER_BY_POPULATION':
            const sortpop = action.payload === 'pop'
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
                ...state,
                countries: sortpop
            }

        case 'GET_DETAILS':
        return {
            ...state,
            detail: action.payload
        }

        case 'CREATE_ACTIVITY':
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default rootReducer;