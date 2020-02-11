export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  fcmToken: string | null;
  profilePictureUrl?: string;
  tribeMember: string[];
  tribeOwner: string[];
}

export type Sex = 'male' | 'female';

export interface Pet {
  name: string;
  sex: Sex;
  ownerTribeId?: string;
}

export interface Tribe {
  id: string;
  name: string;
  petName: string;
  pet: Pet;
  members: string[];
  ownerId: string;
  timestamp: number;
}

export interface TribeCode {
  id: string;
  tribeId: string;
  code: string;
  creationTimestamp: number;
  expirationTimestamp: number;
}

export interface UserInput {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface EditUserInput {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  fcmToken?: string;
  profilePictureUrl?: string;
}

export interface UpdateUserMutationData {
  editUser: EditUserInput;
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
