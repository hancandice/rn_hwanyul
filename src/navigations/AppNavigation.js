import {createSwitchNavigator} from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GraphScreen from '../screens/GraphScreen/GraphScreen';
import DynamicAppStyles from '../DynamicAppStyles';
import KushimConfig from '../KushimConfig';

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const RootNavigator = createSwitchNavigator(
  {
    HomeScreen: {screen: HomeScreen},
    GraphScreen: {screen: GraphScreen},
  },
  {
    initialRouteName: 'HomeScreen',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      appConfig: KushimConfig,
    },
  },
);

const AppContainer = createReduxContainer(RootNavigator);

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppContainer);

export {RootNavigator, AppNavigator, middleware};
