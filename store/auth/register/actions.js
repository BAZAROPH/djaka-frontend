import { POST_REGISTER, POST_REGISTER_SUCCESS, POST_REGISTER_ERROR } from "./actionType";
import { RESET_POST_REGISTER } from "./actionType";

export const postRegister = (data)=>{
    return {
        type: POST_REGISTER,
        payload: data
    }
}

export const postRegisterSuccess = ( message ) => {
    return {
        type: POST_REGISTER_SUCCESS,
        payload: message
    }
}

export const postRegisterError = ( message ) => {
    return {
        type: POST_REGISTER_ERROR,
        payload: message
    }
}

export const resetPostRegister = () => {
    return {
        type: RESET_POST_REGISTER
    }
}