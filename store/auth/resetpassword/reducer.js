import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_RESET_PASSWORD,
} from './actionType';

const initialState = {
    resetPasswordLoading: false,
    response: null,
    resetPasswordError: null
}

const resetPasswordReducer = (state=initialState, action)=>{
    switch (action.type) {
        case RESET_PASSWORD:
            state = {
                resetPasswordLoading: true,
                response: null,
                resetPasswordError: null
            }
            break;
    
        case RESET_PASSWORD_SUCCESS:
            state = {
                resetPasswordLoading: false,
                response: action.payload,
                resetPasswordError: null
            }
            break;
    
        case RESET_PASSWORD_ERROR:
            state = {
                resetPasswordLoading: false,
                response: null,
                resetPasswordError: action.payload
            }
            break;
    
        case RESET_RESET_PASSWORD:
            state = {
                resetPasswordLoading: false,
                response: null,
                resetPasswordError: null
            }
            break;
    
        default:
            state = { ...state }
            break;
    }
    return state;
}

export default resetPasswordReducer;