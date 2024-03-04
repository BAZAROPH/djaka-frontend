import {
    POST_REGISTER,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR,
    RESET_POST_REGISTER
} from './actionType';

const initialState = {
    registerUser: null,
    registerError: null,
    registerLoading: false,
}

const registerUserReducer = (state=initialState, action)=>{
    switch (action.type) {
        case POST_REGISTER:
            state = {
                registerLoading: true,
                registerUser: null,
                registerError: null,
            }
            break;
        case POST_REGISTER_SUCCESS:
            state = {
                registerLoading: false,
                registerUser: action.payload,
                registerError: null,
            }
            break;
        case POST_REGISTER_ERROR:
            state = {
                registerLoading: false,
                registerUser: null,
                registerError: action.payload,
            }
            break;
        case RESET_POST_REGISTER:
            state = {
                registerLoading: false,
                registerUser: null,
                registerError: null,
            }
            break;
    
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default registerUserReducer;