import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import App from './App';
import Feedback from './components/Feedback';

import './config/ReactotronConfig';

import { store, persistor } from './store';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#3E2622" />
        <App />
        <Feedback />
      </PersistGate>
    </Provider>
  );
}
