import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_RESET_PASSWORD,
} from './actionType'

export const resetPassword = (data)=>{
    return {
        type: RESET_PASSWORD,
        payload: data,
    }
}

export const resetPasswordSuccess = (data)=>{
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: data
    }
}

export const resetPasswordError = (message)=>{
    return {
        type: RESET_PASSWORD_ERROR,
        payload: message
    }
}

export const resetResetPassword = ()=>{
    return {
        type: RESET_RESET_PASSWORD
    }
}