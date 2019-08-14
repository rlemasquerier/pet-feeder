export interface User {
  name: string | undefined;
  role: string | undefined;
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

export interface Records {
  [dateString: string]: {
    morning: Record;
    evening: Record;
  };
}
