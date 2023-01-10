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
            let acti = state.activities;
            console.log(acti,"aaaaaaa")
            // const filterByActivity =
            //     action.payload === "All"
            //         ? copia
            //         : acti
            //             .filter((a) => a.name === action.payload)[0]
            //             .countries.map((e) => e);
            const filterByActivity = 
            acti.length && action.payload === "All"
            ? copia.filter((e) => e.activities.length > 0)
            : copia.filter((e) => e.activities.find((a) => a.name === action.payload))
            if(filterByActivity.length) {
            return {
                ...state,
                countries: filterByActivity,
                };
            } 
            return {
                ...state,
                countries: copia
            }

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