export interface User {
  id: string;
  name: string;
  role: string;
  fcmToken: string | null;
}

export interface UserInput {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface Credentials {
  email: string | undefined;
  password: string | undefined;
}

export interface AuthenticationInformation {
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
  email: string;
}

export interface Record {
  feederId: string;
  feederName: string;
  id: string;
  timestamp: number;
}
