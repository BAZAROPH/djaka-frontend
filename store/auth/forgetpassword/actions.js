import {
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_ERROR,
    RESET_FORGET_PASSWORD,
} from './actionType';

export const forgetPassword = (data)=>{
    return {
        type: FORGET_PASSWORD,
        payload: data
    }
}

export const forgetPasswordSuccess = (data)=>{
    return {
        type: FORGET_PASSWORD_SUCCESS,
        payload: data
    }
}

export const forgetPasswordError = (message)=>{
    return {
        type: FORGET_PASSWORD_ERROR,
        payload: message
    }
}

export const resetForgetPassword = ()=>{
    return {
        type: RESET_FORGET_PASSWORD,
    }
}