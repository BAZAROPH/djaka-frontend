import {
    GET_TOWN,
    GET_TOWN_SUCCESS,
    GET_TOWN_ERROR,
    RESET_GET_TOWN,
} from './actionType';

const intialState = {
    getTownLoading: false,
    towns: false,
    getTownError: false,
}

const getTownReducer = (state=intialState, action)=>{
    switch (action.type) {
        case GET_TOWN:
            state = {
                getTownLoading: true,
                towns: null,
                getTownError: null,
            }
            break;
    
        case GET_TOWN_SUCCESS:
            state = {
                getTownLoading: false,
                towns: action.payload,
                getTownError: null,
            }
            break;
    
        case GET_TOWN_ERROR:
            state = {
                getTownLoading: false,
                towns: null,
                getTownError: action.payload,
            }
            break;
    
        case RESET_GET_TOWN:
            state = {
                getTownLoading: false,
                towns: null,
                getTownError: null,
            }
            break;
    
        default:
            state = {...state}
            break;
    }
    return state;
}

export default getTownReducer;