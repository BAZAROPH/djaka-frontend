import {
    GET_COUNTRIES,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_ERROR,
    RESET_GET_COUNTRIES
} from './actionType'

export const getCountries = ()=>{
    return {
        type: GET_COUNTRIES,
    }
}

export const getCountriesSuccess = (data)=>{
    return {
        type: GET_COUNTRIES_SUCCESS,
        payload: data
    }
}

export const getCountriesError = (message)=>{
    return {
        type: GET_COUNTRIES_ERROR,
        payload: message
    }
}

export const resetGetCountries = ()=>{
    return {
        type: RESET_GET_COUNTRIES,
    }
}