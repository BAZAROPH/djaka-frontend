import { all, fork } from 'redux-saga/effects';

//auth
import postRegisterSaga from './auth/register/saga';
import verifyOTPSaga from './auth/verifyotp/saga';
import resendOTPSaga from './auth/resendotp/saga';
import loginSaga from './auth/login/saga';
import updateRegisteredUserSaga from './auth/updateregistered/saga';
import forgetPasswordSaga from './auth/forgetpassword/saga';
import resetPasswordSaga from './auth/resetpassword/saga';


//countries
import sendGetCountriesSaga from './countries/get/saga';

//Cities
import sendGetCitiesSaga from './cities/get/saga';

//Townd
import getTownSaga from './town/saga';

// Medical Informations
import updateMedicalInformationSaga from './medicalinformations/put/saga';
import getMedicalInformationsSaga from './medicalinformations/get/saga';

export default function* rootSaga() {
    yield all([
        fork(postRegisterSaga),
        fork(sendGetCountriesSaga),
        fork(sendGetCitiesSaga),
        fork(verifyOTPSaga),
        fork(resendOTPSaga),
        fork(updateMedicalInformationSaga),
        fork(getTownSaga),
        fork(loginSaga),
        fork(updateRegisteredUserSaga),
        fork(forgetPasswordSaga),
        fork(resetPasswordSaga),
        fork(getMedicalInformationsSaga),
    ]);
}