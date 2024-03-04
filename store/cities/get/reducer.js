import {
    GET_CITIES,
    GET_CITIES_SUCCESS,
    GET_CITIES_ERROR,
    RESET_GET_CITIES,
} from './actionType';

const initialState = {
    getCitiesLoading: false,
    cities: null,
    getCitiesError: null,
}

const getCitiesReducer = (state=initialState, action)=>{
    switch (action.type) {
        case GET_CITIES:
            state = {
                getCitiesLoading: true,
                cities: null,
                getCitiesError: null,
            }
            break;

        case GET_CITIES_SUCCESS:
            state = {
                getCitiesLoading: false,
                cities: action.payload,
                getCitiesError: null,
            }
            break;

        case GET_CITIES_ERROR:
            state = {
                getCitiesLoading: false,
                cities: null,
                getCitiesError: action.payload,
            }
            break;
            
        case RESET_GET_CITIES:
            state = {
                getCitiesLoading: false,
                cities: null,
                getCitiesError: null,
            }
            break;
    
        default:
            state = initialState
            break;
    }

    return state;
}

export default getCitiesReducer;