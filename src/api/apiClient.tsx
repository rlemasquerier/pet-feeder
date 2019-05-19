/* eslint-disable no-console */

import firebase from 'react-native-firebase';
import moment from 'moment';
import environment from '../environment';
import { AuthenticationInformation } from '../types/types';
import { computeDayHalf } from '../services';

const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(environment.FIREBASE_CONFIG, 'PetFeeder');
  }
};

interface User {
  name: string;
  role: string;
}

interface AllUsersResponse {
  [userId: string]: User;
}

export const getAllUsers = async (): Promise<AllUsersResponse> => {
  initializeFirebase();
  const ref = firebase.database().ref('/Users');
  return new Promise((resolve, reject) => {
    ref.on(
      'value',
      snapshot => {
        const users = snapshot.val();
        resolve(users);
      },
      error => {
        reject(error);
      }
    );
  });
};

export const getUser = async (firebaseUid: string): Promise<User> => {
  initializeFirebase();
  const ref = firebase.database().ref(`/Users/${firebaseUid}`);
  return new Promise((resolve, reject) => {
    ref.on(
      'value',
      snapshot => {
        const users = snapshot.val();
        resolve(users);
      },
      error => {
        reject(error);
      }
    );
  });
};

export const login = async (credentials: {
  email?: string;
  password?: string;
}): Promise<AuthenticationInformation> => {
  return new Promise((resolve, reject) => {
    if (!credentials.email || !credentials.password) {
      reject(Error('At least one credential is missing'));
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email as string, credentials.password as string)
      .then(() => {
        const loggedUser = firebase.auth().currentUser;
        if (loggedUser) {
          resolve({ firebaseUid: loggedUser.uid, email: loggedUser.email });
        } else {
          reject({ message: 'loggedUser is not defined' });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getAllRecords = async () => {
  const ref = firebase.database().ref('/Records');
  return new Promise((resolve, reject) => {
    ref.on(
      'value',
      snapshot => {
        const records = snapshot.val();
        resolve(records);
      },
      error => {
        reject(error);
      }
    );
  });
};

export const postRecordByDate = (dateString: string, feeder: string): Promise<boolean> => {
  const currentDateTime = moment();
  const dayHalf = computeDayHalf(currentDateTime);
  const ref = firebase.database().ref(`/Records/${dateString}/${dayHalf}`);
  return new Promise((resolve, reject) => {
    ref.update(
      {
        feeder: feeder,
        timestamp: currentDateTime.format('DD/MM/YYYY hh:mm:ss'),
      },
      error => {
        if (error) {
          // eslintignore
          console.warn(error);
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};
