import { takeEvery, all, call, fork, put } from "redux-saga/effects";
import { postLogin } from "../../../Helpers/backend_helper";
import { loginSuccess, loginError } from "./actions";
import { LOGIN_USER } from "./actionType";

function* login({ payload: data }){
    try {
        const response = yield call(postLogin, data);
        if (response) {
            yield put(loginSuccess(response))
        }
    } catch (error) {
        yield put(loginError(error))
    }
}

function* watchLogin(){
    yield takeEvery(LOGIN_USER, login);
}

function* loginSaga() {
    yield all([fork(watchLogin)]);
}

export default loginSaga;