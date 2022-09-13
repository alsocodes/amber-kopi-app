// In App.js in a new project

import * as React from 'react';
import {View, Text, LogBox} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Router from './router';
import {Provider} from 'react-redux';
import store, {persistor} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider} from 'native-base';
import customTheme from './theme';

LogBox.ignoreLogs([
  'NativeBase: The contrast',
  "Warning: Can't perform",
  '`new NativeEventEmitter()` was',
  'Unexpected HTTP code Response',
  'Require cycle:',
]);

// Sentry.init({
//   dsn: 'https://f9bbff13add14c0d86fef4218b70f12e@o1346806.ingest.sentry.io/6625030',
//   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
//   // We recommend adjusting this value in production.
//   tracesSampleRate: 1.0,
// });

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

// export default Sentry.wrap(App);
export default App;
