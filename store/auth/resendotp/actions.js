import {
    RESEND_OTP,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_ERROR,
    RESET_RESEND_OTP,
} from './actionType'

export const resendOTP = (data)=>{
    return {
        type: RESEND_OTP,
        payload: data
    }
}

export const resendOTPSuccess = (data)=>{
    return {
        type: RESEND_OTP_SUCCESS,
        payload: data
    }
}

export const resendOTPError = (data)=>{
    return {
        type: RESEND_OTP_ERROR,
        payload: data
    }
}

export const resetResendOTP = ()=>{
    return {
        type: RESET_RESEND_OTP
    }
}