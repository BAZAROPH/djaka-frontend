import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { updateRegisteredUserSuccess, updateRegisteredUserError } from "./actions";
import { UPDATE_REGISTERED_USER } from "./actionType";
import { postUpdateRegisteredUser } from "../../../Helpers/backend_helper";

function* updateRegisteredUser({ payload: data }){
    try {
        const response = yield call(postUpdateRegisteredUser, data)
        if(response){
            yield put(updateRegisteredUserSuccess(response));
        }
    } catch (error) {
        yield put(updateRegisteredUserError(error));
    }
}

function* watchUpdateRegisteredUser(){
    yield takeEvery(UPDATE_REGISTERED_USER, updateRegisteredUser)
}

function* updateRegisteredUserSaga(){
    yield all([fork(watchUpdateRegisteredUser)]);
}

export default updateRegisteredUserSaga;