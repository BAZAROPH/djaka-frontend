import { takeEvery, call, fork, all, put } from "redux-saga/effects";
import { VERIFY_OTP } from "./actionType";
import { verifyOTPSuccess, verifyOTPError } from "./actions";
import { postVerifyOTP } from "../../../Helpers/backend_helper";

function* verifyOTP({ payload: data}){
    try {
        const response = yield call(postVerifyOTP, data)
        console.log(response);
        if(response){
            yield put(verifyOTPSuccess(response))
        }
    } catch (error) {
        yield put(verifyOTPError(error))
    }
}


function* watchVerifyOTP(){
    yield takeEvery(VERIFY_OTP, verifyOTP);
}

function* verifyOTPSaga(){
    yield all([fork(watchVerifyOTP)]);
}

export default verifyOTPSaga;

