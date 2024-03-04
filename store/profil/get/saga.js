import { takeEvery, call, put, fork, all } from "redux-saga/effects";
import { getPersonalInformationError, getPersonalInformationSuccess } from "./actions";
import { GET_PERSONAL_INFORMATION } from "./actionType";
import { getPersonalInformation } from "../../../Helpers/backend_helper";

function* sendGetPersonalInformation() {
    try {
        const response = yield call(getPersonalInformation);
        if (response) {
            yield put(getPersonalInformationSuccess(response));
        }
    } catch (error) {
        console.log(error);
        yield put(getPersonalInformationError(error));
    }
}

function* watchSendGetPersonalInformation(){
    yield takeEvery(GET_PERSONAL_INFORMATION, sendGetPersonalInformation);
}

function* sendGetPersonalInformationSaga(){
    yield all([fork(watchSendGetPersonalInformation)])
}

export default sendGetPersonalInformationSaga;