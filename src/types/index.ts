export type UserStatus = 'active' | 'blocked';

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  fcmToken: string | null;
  profilePictureUrl?: string;
  tribeMember: string[];
  tribeOwner: string[];
  status: UserStatus;
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
  members: User[];
  ownerId: string;
  customActions: CustomAction[];
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

export type RecordType = 'food' | 'litter' | 'trash' | 'cloth' | 'dishware';

export interface Record {
  feederId: string;
  type: RecordType;
  feederName: string;
  id: string;
  timestamp: number;
}

export interface Activity {
  activityName: string;
  activityText: string;
}

export type CustomAction = {
  id: string;
  name: RecordType;
  displayedDescription: string;
  displayedInAction: string;
};
