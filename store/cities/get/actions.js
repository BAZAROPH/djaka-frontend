import {
    GET_CITIES,
    GET_CITIES_SUCCESS,
    GET_CITIES_ERROR,
    RESET_GET_CITIES,
} from './actionType';

export const getCities = ()=>{

    return {
        type: GET_CITIES,
    }
}

export const getCitiesSuccess = (data)=>{
    return {
        type: GET_CITIES_SUCCESS,
        payload: data
    }
}

export const getCitiesError = (message)=>{
    return {
        type: GET_CITIES_ERROR,
        payload: message
    }
}

export const resetGetCities = ()=>{
    return {
        type: RESET_GET_CITIES,
    }
}