import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

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
  try {
    await messaging().requestPermission();
    // User has authorised
    return getToken();
  } catch (error) {
    // User has rejected permissions
  }
};

export const checkPermission = async (): Promise<string | undefined> => {
  try {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      return getToken();
    } else {
      return requestPermission();
    }
  } catch (error) {
    throw error;
  }
};
