/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainAppStack from './src/navigations/MainAppStack';
import {Provider} from 'react-redux';

import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.app}>
        <MainAppStack />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
