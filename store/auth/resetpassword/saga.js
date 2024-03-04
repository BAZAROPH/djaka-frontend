import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { RESET_PASSWORD } from "./actionType";
import { postResetPassword } from "../../../Helpers/backend_helper";
import { resetPasswordSuccess, resetPasswordError } from "./actions";

function* resetPassword( { payload: data } ){
    try {
        const response = yield call(postResetPassword, data);
        if(response){
            yield put(resetPasswordSuccess(response))
        }
    } catch (error) {
        console.log(error);
        yield put(resetPasswordError(error))
    }
}

function* watchResetPassword(){
    yield takeEvery(RESET_PASSWORD, resetPassword)
}

function* resetPasswordSaga(){
    yield all([fork(watchResetPassword)]);
}

export default resetPasswordSaga;