import {
    GET_MEDICAL_INFORMATIONS,
    GET_MEDICAL_INFORMATIONS_SUCCESS,
    GET_MEDICAL_INFORMATIONS_ERROR,
    RESET_GET_MEDICAL_INFORMATIONS,
} from './actionType';

const initialState = {
    getMedicalInformationsLoading: false,
    medicalInformations: null,
    getMedicalInformationsError: null,
}

const getMedicalInformationsReducer = (state=initialState, action)=>{
    switch (action.type) {
        case GET_MEDICAL_INFORMATIONS:
            state = {
                getMedicalInformationsLoading: true,
                medicalInformations: null,
                getMedicalInformationsError: null,
            }
            break;
    
        case GET_MEDICAL_INFORMATIONS_SUCCESS:
            state = {
                getMedicalInformationsLoading: false,
                medicalInformations: action.payload,
                getMedicalInformationsError: null,
            }
            break;
    
        case GET_MEDICAL_INFORMATIONS_ERROR:
            state = {
                getMedicalInformationsLoading: false,
                medicalInformations: null,
                getMedicalInformationsError: action.payload,
            }
            break;
    
        case RESET_GET_MEDICAL_INFORMATIONS:
            state = {
                getMedicalInformationsLoading: false,
                medicalInformations: null,
                getMedicalInformationsError: null,
            }
            break;
    
        default:
            state = {...state}
            break;
    }

    return state;
}

export default getMedicalInformationsReducer;