import {
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_ERROR,
    RESET_VERIFY_OTP,
} from './actionType';

export const verifyOTP = (data)=>{
    return {
        type: VERIFY_OTP,
        payload: data
    }
}

export const verifyOTPSuccess = (message)=>{
    return {
        type: VERIFY_OTP_SUCCESS,
        payload: message
    }
}

export const verifyOTPError = (message)=>{
    return {
        type: VERIFY_OTP_ERROR,
        payload: message
    }
}

export const resetVerifyOTP = ()=>{
    return {
        type: RESET_VERIFY_OTP,
    }
}