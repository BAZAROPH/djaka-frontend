import { takeEvery, call, put, fork, all } from "redux-saga/effects";
import { getCountriesSuccess, getCountriesError } from "./actions";
import { GET_COUNTRIES } from "./actionType";
import { getCountries } from "../../../Helpers/backend_helper";

function* sendGetCountries(){
    try {
        const response = yield call(getCountries);
        if(response){
            yield put(getCountriesSuccess(response))
        }
    } catch (error) {
        yield put(getCountriesError(error))
    }    
}

function* watchSendGetCountries(){
    yield takeEvery(GET_COUNTRIES, sendGetCountries);
}

function* sendGetCountriesSaga(){
    yield all([fork(watchSendGetCountries)])
}

export default sendGetCountriesSaga;