import {
    GET_PERSONAL_INFORMATION, 
    GET_PERSONAL_INFORMATION_SUCCESS,
    GET_PERSONAL_INFORMATION_ERROR,
    RESET_PERSONAL_INFORMATION
} from './actionType'

// actions.js
export const getPersonalInformation = () => ({
    type: GET_PERSONAL_INFORMATION,
});

export const getPersonalInformationSuccess = (data) => ({
    type: GET_PERSONAL_INFORMATION_SUCCESS,
    payload: data,
});

export const getPersonalInformationError = (message) => ({
    type: GET_PERSONAL_INFORMATION_ERROR,
    payload: message,
});

export const resetGePersonalInformation = () => ({
    type: RESET_PERSONAL_INFORMATION,
});
