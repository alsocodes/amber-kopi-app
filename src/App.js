// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Router from './router';
import {Provider} from 'react-redux';
import store, {persistor} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider} from 'native-base';
import customTheme from './theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <Router />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
