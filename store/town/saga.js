import { takeEvery, all, call, put, fork } from "redux-saga/effects";
import { getTowns } from "../../Helpers/backend_helper";
import { getTownSuccess, getTownError } from "./actions";
import { GET_TOWN } from "./actionType";

function* getTown(){
    try {
        const response = yield call(getTowns);
        if (response){
            yield put(getTownSuccess(response))
        }
    } catch (error) {
        yield put(getTownError(response))
    }
}

function* watchGetTown(){
    yield takeEvery(GET_TOWN, getTown);
}

function* getTownSaga(){
    yield all([fork(watchGetTown)])
}

export default getTownSaga;
