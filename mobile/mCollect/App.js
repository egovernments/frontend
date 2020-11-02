import React from 'react';
import {StyleSheet} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as appTheme} from './custom-theme.json'; // <-- Import app theme
import {AppNavigator} from './src/navigation';
import {store} from './src/store';
import {Provider} from 'react-redux';
const theme = {...lightTheme, ...appTheme};

const App = () => (
  <Provider store={store}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppNavigator />
    </ApplicationProvider>
  </Provider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
