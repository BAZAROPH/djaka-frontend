import * as SecureStore from 'expo-secure-store'

import { APIClient } from "./api_helper";
import * as url from './url_helper';

const api = new APIClient;

export const getLoggedInUser = () => {
    const user = SecureStore.getItemAsync('authUser');
    if(user) return JSON.parse(user);
    return null;
}

export const isUserAuthenticated = () => {
    return getLoggedInUser() !== null ;
}

//auth
export const postRegister = data => api.create(url.REGISTER, data);
export const postUpdateRegisteredUser = data => api.create(url.UPDATE_REGISTERED_USER, data);
export const postVerifyOTP = data => api.create(url.VERIFY_OTP, data);
export const postResendOTP = data => api.create(url.RESEND_OTP + data.id);
export const postLogin = data => api.create(url.LOGIN, data);
export const postForgetPasword = data =>api.create(url.FORGET_PASSWORD, data);
export const postResetPassword = data => api.create(url.RESET_PASSWORD, data);

//Countries 
export const getCountries = () => api.get(url.GET_COUNTRIES);

//Cities
export const getCities = () => api.get(url.GET_CITIES);

//Towns
export const getTowns = () => api.get(url.GET_TOWNS);

//Medical informations
export const putMedicalInformation = data => api.create(url.UPDATE_MEDICAL_INFORMATION, data, 'multipart/form-data');
export const getMedicalInformation = () => api.get(url.GET_MEDICAL_INFORMATIONS);
