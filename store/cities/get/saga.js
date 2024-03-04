import { takeEvery, call, fork, all, put } from "redux-saga/effects";
import { GET_CITIES } from "./actionType";
import { getCities } from "../../../Helpers/backend_helper";
import { getCitiesSuccess, getCitiesError } from "./actions";

function* sendGetCities(){
    try {
        const response = yield call(getCities);
        if(response){
            yield put(getCitiesSuccess(response));
        }
    } catch (error) {
        yield put(getCitiesError(error));
    }
}

function* watchSendGetCities(){
    yield takeEvery(GET_CITIES, sendGetCities);
}

function* sendGetCitiesSaga(){
    yield all([fork(watchSendGetCities)]);
}

export default sendGetCitiesSaga;