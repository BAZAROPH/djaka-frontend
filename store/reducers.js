import { combineReducers } from 'redux';

//auth
import registerUserReducer from './auth/register/reducer';
import updateRegisteredUserReducer from './auth/updateregistered/reducer';
import verifyOTPReducer from './auth/verifyotp/reducer';
import resendOTPReducer from './auth/resendotp/reducer';
import loginReducer from './auth/login/reducer';
import forgetPasswordReducer from './auth/forgetpassword/reducer';
import resetPasswordReducer from './auth/resetpassword/reducer';

//countries
import getCountriesReducer from './countries/get/reducer';

//Cities
import getCitiesReducer from './cities/get/reducer';

//Towns
import getTownReducer from './town/reducer';

// Medical Informations
import updateMedicalInformationReducer from './medicalinformations/put/reducer';
import getMedicalInformationsReducer from './medicalinformations/get/reducer';

const rootReducer = combineReducers({
    registerUserReducer,
    updateRegisteredUserReducer,
    verifyOTPReducer,
    resendOTPReducer,
    loginReducer,
    forgetPasswordReducer,
    resetPasswordReducer,

    getCountriesReducer,

    getCitiesReducer,

    getTownReducer,

    updateMedicalInformationReducer,
    getMedicalInformationsReducer
});

export default rootReducer;