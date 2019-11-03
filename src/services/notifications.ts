import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { checkNotifications, requestNotifications } from 'react-native-permissions';

const getToken = async (): Promise<string | undefined> => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      // user has a device token
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
  return fcmToken;
};

const requestPermission = async (): Promise<string | undefined> => {
  const notificationsPermission = await requestNotifications(['alert', 'sound']);
  if (notificationsPermission.status === 'granted') {
    // User has authorised
    return getToken();
  } else {
    throw new Error('Notifications has not been allowed');
  }
};

export const checkPermission = async (): Promise<string | undefined> => {
  const notificationsPermission = await checkNotifications();
  if (notificationsPermission.status === 'granted') {
    return getToken();
  } else {
    return requestPermission();
  }
};
