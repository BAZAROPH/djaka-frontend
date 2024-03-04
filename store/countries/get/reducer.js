import {
    GET_COUNTRIES,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_ERROR,
    RESET_GET_COUNTRIES
} from './actionType'

const initialState ={
    getCountriesLoading: false,
    countries: null,
    getCountriesError: null,
}

const getCountriesReducer = (state=initialState, action)=>{
    switch (action.type) {
        case GET_COUNTRIES:
            state = {
                getCountriesLoading: true,
                countries: null,
                getCountriesError: null,
            }
            break;
            
        case GET_COUNTRIES_SUCCESS:
                state = {
                    getCountriesLoading: false,
                    countries: action.payload,
                    getCountriesError: null,
                }
                break;

        case GET_COUNTRIES_ERROR:
            state = {
                getCountriesLoading: false,
                countries: null,
                getCountriesError: action.payload,
            }
            break;

        case RESET_GET_COUNTRIES:
                state = {
                    getCountriesLoading: false,
                    countries: null,
                    getCountriesError: null,
                }
                break;
        default:
            state = {...state}
            break;
    }
    return state;
}

export default getCountriesReducer;