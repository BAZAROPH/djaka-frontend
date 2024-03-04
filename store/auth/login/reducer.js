import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    RESET_LOGIN_USER,
} from './actionType'

const initialState = {
    loginLoading: false,
    authUser: null,
    loginError: null,
}

const loginReducer = (state=initialState, action)=>{
    switch (action.type) {
        case LOGIN_USER:
            state = {
                loginLoading: true,
                authUser: null,
                loginError: null,
            }
            break;

        case LOGIN_USER_SUCCESS:
            state = {
                loginLoading: false,
                authUser: action.payload,
                loginError: null,
            }
            break;

        case LOGIN_USER_ERROR:
            state = {
                loginLoading: false,
                authUser: null,
                loginError: action.payload,
            }
            break;

        case RESET_LOGIN_USER:
            state = {
                loginLoading: false,
                authUser: null,
                loginError: null,
            }
            break;

        default:
            state = {...state}
            break;
    }

    return state;
}

export default loginReducer;