import {
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_ERROR,
    RESET_FORGET_PASSWORD,
} from './actionType';

const initialState = {
    forgetPasswordLoading: false,
    user: null,
    forgetPasswordError: null
}

const forgetPasswordReducer = (state=initialState, action)=>{
    switch (action.type) {
        case FORGET_PASSWORD:
            state = {
                forgetPasswordLoading: true,
                user: null,
                forgetPasswordError: null
            }
            break;

        case FORGET_PASSWORD_SUCCESS:
            state = {
                forgetPasswordLoading: false,
                user: action.payload,
                forgetPasswordError: null
            }
            break;

        case FORGET_PASSWORD_ERROR:
            state = {
                forgetPasswordLoading: false,
                user: null,
                forgetPasswordError: action.payload
            }
            break;

        case RESET_FORGET_PASSWORD:
            state = {
                forgetPasswordLoading: false,
                user: null,
                forgetPasswordError: null
            }
            break;
    
        default:
            state = {...state}
            break;
    }
    return state;
}

export default forgetPasswordReducer;