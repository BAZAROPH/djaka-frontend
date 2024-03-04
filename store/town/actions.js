import {
    GET_TOWN,
    GET_TOWN_SUCCESS,
    GET_TOWN_ERROR,
    RESET_GET_TOWN,
} from './actionType';

export const getTowns = ()=>{
    return {
        type: GET_TOWN
    }
}

export const getTownSuccess = (data)=>{
    return {
        type: GET_TOWN_SUCCESS,
        payload: data
    }
}

export const getTownError = (message)=>{
    return {
        type: GET_TOWN_ERROR,
        payload: message
    }
}

export const resetGetTown = ()=>{
    return {
        type: RESET_GET_TOWN
    }
}

