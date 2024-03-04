import {
    UPDATE_REGISTERED_USER,
    UPDATE_REGISTERED_USER_SUCCESS,
    UPDATE_REGISTERED_USER_ERROR,
    RESET_UPDATE_REGISTERED_USER,
} from './actionType';

const initialState = {
    updateRegisteredUserLoading: false,
    data: null,
    updateRegisteredUserError: null,
}

const updateRegisteredUserReducer = (state=initialState, action)=>{
    switch (action.type) {
        case UPDATE_REGISTERED_USER:
            state = {
                updateRegisteredUserLoading: true,
                data: null,
                updateRegisteredUserError: null,
            }
            break;
    
        case UPDATE_REGISTERED_USER_SUCCESS:
            state = {
                updateRegisteredUserLoading: false,
                data: action.payload,
                updateRegisteredUserError: null,
            }
            break;
    
        case UPDATE_REGISTERED_USER_ERROR:
            state = {
                updateRegisteredUserLoading: false,
                data: null,
                updateRegisteredUserError: action.payload,
            }
            break;
    
        case RESET_UPDATE_REGISTERED_USER:
            state = {
                updateRegisteredUserLoading: false,
                data: null,
                updateRegisteredUserError: null,
            }
            break;
    
        default:
            state = {...state}
            break;
    }
    return state;
}

export default updateRegisteredUserReducer