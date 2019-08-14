import axios, { AxiosResponse } from 'axios';
import environment from '../environment';

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
