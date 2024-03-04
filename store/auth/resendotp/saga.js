import { takeEvery, all, fork, put, call } from "redux-saga/effects";
import { resendOTPSuccess, resendOTPError } from "./actions";
import { postResendOTP } from "../../../Helpers/backend_helper";
import { RESEND_OTP } from "./actionType";

function* resendOTP({ payload: data}){
    try {
        const response = yield call(postResendOTP, data);
        if(!response.error){
            yield put(resendOTPSuccess(response.message));
        }else{
            yield put(resendOTPError(response.message));
        }
    } catch (error) {
        yield put(resendOTPError(error));
    }
}

function* watchResendOTP(){
    yield takeEvery(RESEND_OTP, resendOTP);
}

function* resendOTPSaga(){
    yield all([fork(watchResendOTP)]);
}

export default resendOTPSaga;