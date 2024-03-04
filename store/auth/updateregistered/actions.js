import {
    UPDATE_REGISTERED_USER,
    UPDATE_REGISTERED_USER_SUCCESS,
    UPDATE_REGISTERED_USER_ERROR,
    RESET_UPDATE_REGISTERED_USER,
} from './actionType';

export const updateRegisteredUser = (data)=>{
    return {
        type: UPDATE_REGISTERED_USER,
        payload: data,
    }
}

export const updateRegisteredUserSuccess = (data)=>{
    return {
        type: UPDATE_REGISTERED_USER_SUCCESS,
        payload: data,
    }
}

export const updateRegisteredUserError = (message)=>{
    return {
        type: UPDATE_REGISTERED_USER_ERROR,
        payload: message,
    }
}

export const resetUpdateRegisteredUser = ()=>{
    return {
        type: RESET_UPDATE_REGISTERED_USER,
    }
}