/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() === 'production'
    ? 'production'
    : 'development';

AppRegistry.registerComponent(appName, () => App);
