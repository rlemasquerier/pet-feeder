import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://104.155.115.209:3000';

export const publicApi = axios.create();

interface LoginAPIResponse {
  accessToken: string;
  refreshToken: string;
}

export type LoginAxiosResponse = AxiosResponse<LoginAPIResponse>;

export const login = async (
  email: string | undefined,
  password: string | undefined
): Promise<LoginAxiosResponse> => {
  const response = publicApi.post(`${API_URL}/auth/login`, { email, password });
  return response;
};
