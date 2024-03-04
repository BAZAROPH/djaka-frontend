import {
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_ERROR,
    RESET_VERIFY_OTP,
} from './actionType';

const initialState = {
    verifyOTPLoading: false,
    verifyOTPSuccess: null,
    verifyOTPError: null,
}

const verifyOTPReducer = (state=initialState, action)=>{
    switch (action.type) {
        case VERIFY_OTP:
            state = {
                verifyOTPLoading: true,
                verifyOTPSuccess: null,
                verifyOTPError: null,
            }
            break;
            
        case VERIFY_OTP_SUCCESS:
            state = {
                verifyOTPLoading: false,
                verifyOTPSuccess: action.payload,
                verifyOTPError: null,
            }
            break;
            
        case VERIFY_OTP_ERROR:
            state = {
                verifyOTPLoading: false,
                verifyOTPSuccess: null,
                verifyOTPError: action.payload,
            }
            break;
            
        case RESET_VERIFY_OTP:
            state = {
                verifyOTPLoading: false,
                verifyOTPSuccess: null,
                verifyOTPError: null,
            }
            break;
    
        default:
            state = {...state}
            break;
    }
    return state;
}

export default verifyOTPReducer;