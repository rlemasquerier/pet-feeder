import axios, { AxiosResponse } from 'axios';
import environment from '../environment';
import { ImagePickerResponse } from 'react-native-image-picker';
import { TribeCode } from 'pet-feeder/src/types';

const API_URL = environment.API_URL;

export const publicApi = axios.create();

export interface LoginAPIResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
}

export type LoginAxiosResponse = AxiosResponse<LoginAPIResponse>;

export const login = async (
  email: string | undefined,
  password: string | undefined
): Promise<LoginAxiosResponse> => {
  const response = publicApi.post(`${API_URL}/auth/login`, { email, password });
  return response;
};

export const refreshToken = async (
  email: string | undefined,
  refreshToken: string | undefined
): Promise<AxiosResponse<{ accessToken: string; refreshToken: string }>> => {
  const response = publicApi.post(`${API_URL}/auth/refresh`, { email, refreshToken });
  return response;
};

export const createTribeCode = async (tribeId: string): Promise<AxiosResponse<TribeCode>> => {
  const response = publicApi.post(`${API_URL}/tribeCodes/generate`, { tribeId });
  return response;
};

export const checkTribeCode = async (code: string): Promise<AxiosResponse<string>> => {
  return publicApi.post(`${API_URL}/tribeCodes/compare`, { code });
};

export const uploadPicture = async (
  image: ImagePickerResponse
): Promise<{ uri?: string; error?: string }> => {
  if (!image.type) {
    return Promise.resolve({ error: "Can't upload image : no image type provided" });
  }
  const file = {
    uri: image.uri,
    name: image.fileName,
    type: image.type,
    size: image.fileSize,
    slice: () => new Blob(),
  };

  const body = new FormData();
  body.append('image', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body,
  });

  return response.json();
};
