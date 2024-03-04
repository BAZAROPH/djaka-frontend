import { takeEvery, call, put, fork, all } from "redux-saga/effects";
import { forgetPasswordSuccess, forgetPasswordError } from "./actions";
import { postForgetPasword } from "../../../Helpers/backend_helper";
import { FORGET_PASSWORD } from "./actionType";

function* forgetPassword( { payload: data } ){
    try {
        const response = yield call(postForgetPasword, data);
        if(response){
            yield put(forgetPasswordSuccess(response))
        }
    } catch (error) {
        yield put(forgetPasswordError(error))
    }
}

function* watchForgetPassword(){
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* forgetPasswordSaga(){
    yield all([fork(watchForgetPassword)]);
}

export default forgetPasswordSaga;