/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import Bar from './src/components/status-bar';
import Navigation from './src/navigations';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
    registerAppWithFCM();
    requestUserPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestUserPermission = async () => {
    const enabled = await messaging().requestPermission();
    if (enabled) {
      getToken();
    }
  };

  const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
  };

  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('Device Token', token);
        AsyncStorage.setItem('deviceToken', token);
      });
  };

  return (
    <>
      <Bar />
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </>
  );
};

export default App;
