import {
    UPDATE_MEDICAL_INFORMATION,
    UPDATE_MEDICAL_INFORMATION_SUCCESS,
    UPDATE_MEDICAL_INFORMATION_ERROR,
    RESET_UPDATE_MEDICAL_INFORMATION,
} from './actionType';

const initialState = {
    updateMedicalInformationLoading: false,
    medicalInformations: null,
    updateMedicalInformationError: null
}

const updateMedicalInformationReducer = (state=initialState, action)=>{
    switch (action.type) {
        case UPDATE_MEDICAL_INFORMATION:
            state = {
                updateMedicalInformationLoading: true,
                medicalInformations: null,
                updateMedicalInformationError: null
            }
            break;

        case UPDATE_MEDICAL_INFORMATION_SUCCESS:
            state = {
                updateMedicalInformationLoading: false,
                medicalInformations: action.payload,
                updateMedicalInformationError: null
            }
            break;

        case UPDATE_MEDICAL_INFORMATION_ERROR:
            state = {
                updateMedicalInformationLoading: false,
                medicalInformations: null,
                updateMedicalInformationError: action.payload
            }
            break;

        case RESET_UPDATE_MEDICAL_INFORMATION:
            state = {
                updateMedicalInformationLoading: false,
                medicalInformations: null,
                updateMedicalInformationError: null
            }
            break;
    
        default:
            state = {...state}
            break;
    }
    return state;
}

export default updateMedicalInformationReducer;