import {ThemeProvider} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Appearance, LogBox} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {AppNavigator} from './src/navigations/AppNavigation';
import configureStore from './src/redux/store/index';

const store = configureStore();

LogBox.ignoreLogs([
  'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
]);

const quertClient = new QueryClient();

const App = () => {
  enableScreens();
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    Appearance.addChangeListener(({_colorScheme}) => {
      setColorScheme(_colorScheme);
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={colorScheme}>
        <QueryClientProvider client={quertClient}>
          <AppNavigator screenProps={{theme: colorScheme}} />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
