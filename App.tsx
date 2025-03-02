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
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {EventType} from '@notifee/react-native';

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

  async function requestUserPermission() {
    await messaging().requestPermission();
  }

  async function requestPermission() {
    if (Platform.OS === 'android') {
      await notifee.requestPermission();
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  }

  // useEffect(() => {
  //   // Khi user nhận thông báo lúc app đang mở (foreground)
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('📢 Received FCM Notification (Foreground):', remoteMessage);
  //     // try {
  //     //   await notifee.displayNotification({
  //     //     title: remoteMessage.data?.title ?? 'Thông báo mới',
  //     //     body: remoteMessage.data?.body ?? '',
  //     //     android: {channelId: 'default'},
  //     //   });
  //     // } catch (error) {
  //     //   console.error('🔥 Notifee Error:', error);
  //     // }
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    // Lắng nghe sự kiện khi user nhấn vào notification
    return notifee.onForegroundEvent(({type, detail}) => {
      console.log('📢 Notifee Event Triggered:', type, detail);
      if (type === EventType.PRESS) {
        console.log('🔔 User clicked notification:', detail.notification);
      }
    });
  }, []);

  // async function bootstrap() {
  //   const initialNotification = await notifee.getInitialNotification();

  //   if (initialNotification) {
  //     console.log(
  //       'Notification caused application to open',
  //       initialNotification.notification,
  //     );
  //     console.log(
  //       'Press action used to open the app',
  //       initialNotification.pressAction,
  //     );
  //   }
  // }

  // useEffect(() => {
  //   bootstrap()
  //     .then(() => console.log('user co bam vao event xem noti k'))
  //     .catch(console.error);
  // }, []);

  const getToken = async () => {
    const token = await messaging().getToken();
    await AsyncStorage.setItem('token-device', token);
  };

  useEffect(() => {
    requestPermission();
    requestUserPermission();
    getToken();
  }, []);

  return <AppNavigation />;
}

export default App;
