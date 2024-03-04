import {
    GET_MEDICAL_INFORMATIONS,
    GET_MEDICAL_INFORMATIONS_SUCCESS,
    GET_MEDICAL_INFORMATIONS_ERROR,
    RESET_GET_MEDICAL_INFORMATIONS,
} from './actionType';

export const getMedicalInformation = ()=>{
    return {
        type: GET_MEDICAL_INFORMATIONS
    }
}

export const getMedicalInformationSuccess = (data)=>{
    return {
        type: GET_MEDICAL_INFORMATIONS_SUCCESS,
        payload: data
    }
}

export const getMedicalInformationError = (message)=>{
    return {
        type: GET_MEDICAL_INFORMATIONS_ERROR,
        payload: message
    }
}

export const resetGetMedicalInformation = ()=>{
    return {
        type: RESET_GET_MEDICAL_INFORMATIONS
    }
}