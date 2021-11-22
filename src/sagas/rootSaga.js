import {all, fork} from 'redux-saga/effects';
import currencySaga from './currencySaga';

export default function* rootSaga() {
  yield all([fork(currencySaga)]);
}
