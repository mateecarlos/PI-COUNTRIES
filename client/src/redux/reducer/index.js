const initialState = {
    countries : [],
    allCountries: [],
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
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

        default:
            return state;
    }
}

export default rootReducer;