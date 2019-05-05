import firebase, { RNFirebase } from 'react-native-firebase';
import environment from '../environment';

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

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<RNFirebase.UserCredential> => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(credentials => {
        resolve(credentials);
      })
      .catch(error => {
        reject(error);
      });
  });
};
