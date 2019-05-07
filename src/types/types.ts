export interface User {
  name: string | undefined;
  role: string | undefined;
}

export interface Credentials {
  email: string | undefined;
  password: string | undefined;
}

export interface AuthenticationInformation {
  email: string | undefined | null;
  firebaseUid: string | undefined;
}
