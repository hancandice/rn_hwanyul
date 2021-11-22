export const RECEIVE_RATES = 'RECEIVE_RATES';
export const SUBMIT_CONVERSION = 'SUBMIT_CONVERSION';
export const SUBMIT_OPTION_FROM = 'SUBMIT_OPTION_FROM';
export const SUBMIT_OPTION_TO = 'SUBMIT_OPTION_TO';
export const UPDATE_OPTION_FROM = 'UPDATE_OPTION_FROM';
export const UPDATE_OPTION_TO = 'UPDATE_OPTION_TO';
export const UPDATE_TIME_SERIES = 'UPDATE_TIME_SERIES';

const initialState = {
  optionFrom: null,
  optionTo: null,
  rates: {
    lastUpdated: null,
    byId: {},
    allIds: [],
  },
  timeSeries: [],
};

export const currency = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RATES: {
      return Object.assign({}, state, {
        rates: action.rates,
      });
    }
    case UPDATE_OPTION_FROM: {
      return Object.assign({}, state, {
        optionFrom: action.option,
      });
    }
    case UPDATE_OPTION_TO: {
      return Object.assign({}, state, {
        optionTo: action.option,
      });
    }
    case UPDATE_TIME_SERIES: {
      return Object.assign({}, state, {
        timeSeries: action.payload,
      });
    }
    default:
      return state;
  }
};
