import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StackNavigator} from './src/navigation/StackNavigator';
import BottomTabNavigator from './src/navigation/TabNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {AuthProvider} from './src/context/AuthContext';
import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {PermissionsAndroid} from 'react-native';

import {
  getToken,
  notificationListenr,
  requestUserPermission,
} from './src/core/commonUtils';

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);

      Alert.alert(
        'A new FCM message arrived!',
        `Title : ${remoteMessage.notification.body} `,
      );
    });
    return unsubscribe;
  }, []);

  const requestNotificationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  const checkNotificationPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  const requestPermission = async () => {
    const checkPermission = await checkNotificationPermission();
    if (checkPermission !== RESULTS.GRANTED) {
      const request = await requestNotificationPermission();
      if (request !== RESULTS.GRANTED) {
        // permission not granted
        console.log('error');
      }
    }
  };

  useEffect(() => {
    requestPermission();
    requestUserPermission();
    notificationListenr();
    getToken();
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
