import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { UPDATE_MEDICAL_INFORMATION } from "./actionType";
import { updateMedicalInformationSuccess, updateMedicalInformationError } from "./actions";
import { putMedicalInformation } from "../../../Helpers/backend_helper";

function* updateMedicalInformation({ payload: data }){
    try {
        const response = yield call(putMedicalInformation, data)
        if (response){
            yield put(updateMedicalInformationSuccess(response));
        }
    } catch (error) {
        yield put(updateMedicalInformationError(error))
    }
}

function* watchUpdateMedicalInformation(){
    yield takeEvery(UPDATE_MEDICAL_INFORMATION, updateMedicalInformation);
}

function* updateMedicalInformationSaga(){
    yield all([fork(watchUpdateMedicalInformation)]);
}

export default updateMedicalInformationSaga;