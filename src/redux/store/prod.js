import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppReducer from '..';
import {middleware} from '../../navigations/AppNavigation';
import rootSaga from '../../sagas/rootSaga';

const saga = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(AppReducer, applyMiddleware(saga, middleware));

  saga.run(rootSaga);
  return store;
};

export default configureStore;
