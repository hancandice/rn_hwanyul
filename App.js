import {ThemeProvider} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {AppNavigator} from './src/navigations/AppNavigation';
import configureStore from './src/redux/store/index';

const store = configureStore();

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
        <AppNavigator screenProps={{theme: colorScheme}} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
