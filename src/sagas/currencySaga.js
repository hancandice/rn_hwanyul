import {delay} from 'redux-saga';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  RECEIVE_RATES,
  SUBMIT_CONVERSION,
  SUBMIT_OPTION_FROM,
  SUBMIT_OPTION_TO,
  UPDATE_OPTION_FROM,
  UPDATE_OPTION_TO,
} from '../redux/reducers';
import currencyService from '../services/currencyService';

const getCurrency = state => state.currency;

function* updateOptionFrom(action) {
  yield put({type: UPDATE_OPTION_FROM, option: action.option});
}

function* updateOptionTo(action) {
  yield put({type: UPDATE_OPTION_TO, option: action.option});
}

function* updateConversion(action) {
  const {optionFrom, optionTo} = yield select(getCurrency);
}

function* updateRates() {
  while (true) {
    console.log('fetching conversion rates...');

    const {optionFrom, optionTo} = yield select(getCurrency);
    const rates = yield call(currencyService.fetchConversionRates);

    if (rates) {
      if (!optionFrom || !optionTo) {
        yield put({type: UPDATE_OPTION_FROM, option: rates.allIds[0]});
        yield put({type: UPDATE_OPTION_TO, option: rates.allIds[1]});
      }
      yield put({type: RECEIVE_RATES, rates});
      break;
    } else {
      yield delay(1000 * 60 * 1);
    }
  }
}

export default function* currencySaga() {
  yield takeLatest(SUBMIT_OPTION_FROM, updateOptionFrom);
  yield takeLatest(SUBMIT_OPTION_TO, updateOptionTo);
  yield takeLatest(SUBMIT_CONVERSION, updateConversion);
  yield call(updateRates);
}
