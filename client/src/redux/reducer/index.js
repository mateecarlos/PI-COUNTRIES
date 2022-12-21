const initialState = {
    countries : [],
    allCountries: [],
    activities: [],
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

        // case 'GET_ACTIVITIES':
        //     return {
        //         ...state,
        //         activities: action.payload
        //     }

        // case 'BY_ACTIVITY':
        //     const copia = state.allCountries;
        //     const actividad = state.activities;
        //     const filtroByActivity = 
        //     action.payload === 'All'
        //     ? copia
        //     : actividad
        //     .filter((a) => a.name === action.payload)[0]
        //     .countries.map((e) => e);
        //     return {
        //         ...state,
        //         countries: filtroByActivity
        //     }

        default:
            return state;
    }
}

export default rootReducer;