import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    RESET_LOGIN_USER,
} from './actionType'

export const login = (data)=>{
    return {
        type: LOGIN_USER,
        payload: data
    }
}

export const loginSuccess = (data)=>{
    return {
        type: LOGIN_USER_SUCCESS,
        payload: data
    }
}

export const loginError = (message)=>{
    return {
        type: LOGIN_USER_ERROR,
        payload: message
    }
}
export const resetLogin = ()=>{
    return {
        type: RESET_LOGIN_USER,
    }
}
