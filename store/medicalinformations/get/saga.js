import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { getMedicalInformation } from "../../../Helpers/backend_helper";
import { getMedicalInformationSuccess, getMedicalInformationError } from "./actions";
import { GET_MEDICAL_INFORMATIONS } from "./actionType";

function* getMedicalInformations(){
    try {
        const response = yield call(getMedicalInformation);
        if(response){
            yield put(getMedicalInformationSuccess(response));
        }
    } catch (error) {
        yield put(getMedicalInformationError(error));
    }
}

function* watchGetMedicalInformations(){
    yield takeEvery(GET_MEDICAL_INFORMATIONS, getMedicalInformations);
}

function* getMedicalInformationsSaga(){
    yield all([fork(watchGetMedicalInformations)]);
}

export default getMedicalInformationsSaga;