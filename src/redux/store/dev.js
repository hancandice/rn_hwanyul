import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import AppReducer from '..';
import {middleware} from '../../navigations/AppNavigation';
import rootSaga from '../../sagas/rootSaga';

const saga = createSagaMiddleware();

const configureStore = () => {
  const logger = createLogger();
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers =
    (typeof window !== 'undefined' && devTools) || compose;

  const store = createStore(
    AppReducer,
    composeEnhancers(applyMiddleware(saga, logger, middleware)),
  );

  saga.run(rootSaga);

  return store;
};

export default configureStore;
