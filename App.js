/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  Text,
  StatusBar,
} from 'react-native';
import messaging, {AuthorizationStatus } from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const App = () => {

  useEffect( async () => {

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

    Alert.alert(enabled)

    if (enabled) {
      console.log('Authorization status:', authStatus);

    }

    const unsubscribe = messaging().onMessage( remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    const fcmToken = await firebase.messaging().getToken();
    console.log(fcmToken)

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
      );
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
            );
          }
        });

    messaging().setBackgroundMessageHandler( remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    return await unsubscribe;

  }, []);

  return (
    <SafeAreaView>
      <Text>İlker</Text>
    </SafeAreaView>
  );
};
export default App;
