import {
    UPDATE_MEDICAL_INFORMATION,
    UPDATE_MEDICAL_INFORMATION_SUCCESS,
    UPDATE_MEDICAL_INFORMATION_ERROR,
    RESET_UPDATE_MEDICAL_INFORMATION,
} from './actionType';

export const updateMedicalInformation = (data)=>{
    return  {
        type: UPDATE_MEDICAL_INFORMATION,
        payload: data
    }
}

export const updateMedicalInformationSuccess = (message)=>{
    return  {
        type: UPDATE_MEDICAL_INFORMATION_SUCCESS,
        payload: message
    }
}

export const updateMedicalInformationError = (message)=>{
    return  {
        type: UPDATE_MEDICAL_INFORMATION_ERROR,
        payload: message
    }
}

export const resetUpdateMedicalInformation = ()=>{
    return  {
        type: RESET_UPDATE_MEDICAL_INFORMATION,
    }
}