import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

const getToken = async (): Promise<string | undefined> => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // user has a device token
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
  return fcmToken;
};

const requestPermission = async (): Promise<string | undefined> => {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
    return getToken();
  } catch (error) {
    // User has rejected permissions
  }
};

export const checkPermission = async (): Promise<string | undefined> => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    return getToken();
  } else {
    return requestPermission();
  }
};
