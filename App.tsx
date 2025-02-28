/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import AppNavigation from './src/navigation';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {PermissionsAndroid, Platform} from 'react-native';

function App(): JSX.Element {
  const firebaseConfig = {
    apiKey: 'AIzaSyC9fo6CN5y1SKaY2O4Ud4XEZvTq_M0Z6oo',
    authDomain: 'party-notification-31d23.firebaseapp.com',
    projectId: 'party-notification-31d23',
    storageBucket: 'party-notification-31d23.firebasestorage.app',
    messagingSenderId: '281254271515',
    appId: '1:281254271515:web:301275afc44ed5d28436be',
    measurementId: 'G-4XDYJEZV3W',
    databaseURL:
      'https://party-notification-31d23-default-rtdb.asia-southeast1.firebasedatabase.app',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  async function requestPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('Notification permission:', granted);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
  };

  useEffect(() => {
    requestPermission();
    getToken();
  }, []);

  return <AppNavigation />;
}

export default App;
