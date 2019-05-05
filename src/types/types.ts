export interface User {
  name: string;
  role: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthenticationInformation {
  email: string | null;
  firebaseUid: string;
}
