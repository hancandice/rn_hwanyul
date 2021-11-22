import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {combineReducers} from 'redux';
import {RootNavigator} from '../navigations/AppNavigation';
import {currency} from './reducers';

const navReducer = createNavigationReducer(RootNavigator);

const AppReducer = combineReducers({
  nav: navReducer,
  currency,
});

export default AppReducer;
