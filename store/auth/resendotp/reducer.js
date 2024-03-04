import {
    RESEND_OTP,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_ERROR,
    RESET_RESEND_OTP,
} from './actionType'

const initialState = {
    resendOTPLoading: false,
    resendOTPSuccess: null,
    resendOTPError: null
}

const resendOTPReducer = (state=initialState, action)=>{
    switch (action.type) {
        case RESEND_OTP:
            state = {
                resendOTPLoading: true,
                resendOTPSuccess: null,
                resendOTPError: null
            }
            break;

        case RESEND_OTP_SUCCESS:
            state = {
                resendOTPLoading: false,
                resendOTPSuccess: action.payload,
                resendOTPError: null
            }
            break;

        case RESEND_OTP_ERROR:
            state = {
                resendOTPLoading: false,
                resendOTPSuccess: null,
                resendOTPError: action.payload
            }
            break;

        case RESET_RESEND_OTP:
            state = {
                resendOTPLoading: false,
                resendOTPSuccess: null,
                resendOTPError: null
            }
            break;

        default:
            state = { ...state }
            break;
    }
    return state;
}

export default resendOTPReducer;