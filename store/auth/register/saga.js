import { takeEvery, call, put, fork, all } from "redux-saga/effects";
import { postRegisterSuccess, postRegisterError } from "./actions";
import { POST_REGISTER } from "./actionType";
import { postRegister } from "../../../Helpers/backend_helper";


function* sendRegisterPost({ payload : data }){
    try {
        const response = yield call(postRegister, data);
        if(response){
            yield put(postRegisterSuccess(response));
        }

    } catch(error) {
        yield put(postRegisterError(error))
    }
}

function* watchSendRegisterPost(){
    yield takeEvery(POST_REGISTER, sendRegisterPost);
}

function* postRegisterSaga(){
    yield all([fork(watchSendRegisterPost)]);
}

export default postRegisterSaga;