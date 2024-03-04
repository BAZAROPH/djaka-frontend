import {
    GET_PERSONAL_INFORMATION,
    GET_PERSONAL_INFORMATION_SUCCESS,
    GET_PERSONAL_INFORMATION_ERROR,
    RESET_PERSONAL_INFORMATION
} from './actionType'

const initialState = {
    getPersonalInformationLoading: false,
    personalInformation: null,
    getPersonalInformationError: null,
}

const getPersonalInformationReducer = (state=initialState, action)=>{
    switch (action.type) {
        case GET_PERSONAL_INFORMATION:
            state = {
                getPersonalInformationLoading: true,
                personalInformation: null,
                getPersonalInformationError: null,
            }
            break;

        case GET_PERSONAL_INFORMATION_SUCCESS:
            state = {
                getPersonalInformationLoading: false,
                personalInformation: action.payload,
                getPersonalInformationError: null,
            }
            break;

        case GET_PERSONAL_INFORMATION_ERROR:
            state = {
                getPersonalInformationLoading: false,
                personalInformation: null,
                getPersonalInformationError: action.payload,
            }
            break;

        case RESET_PERSONAL_INFORMATION:
                state = {
                    getPersonalInformationLoading: false,
                    personalInformation: null,
                    getPersonalInformationError: null,
                }
            break;
    
        default:
            state = initialState
            break;
    }
    return state
}

export default getPersonalInformationReducer;