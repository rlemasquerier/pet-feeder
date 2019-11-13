import { Action } from 'redux';
import { Credentials } from '../../types';
import { RootState } from '../reducer';
import { LoginAPIResponse } from '../../api/apiClient';
import { PageNameType } from 'pet-feeder/src/services/navigation';

export const LOGIN_REQUEST = 'authentication/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'authentication/LOGIN_FAILURE';
export const REFRESH_TOKENS = 'authentication/REFRESH_TOKENS';
export const LOGOUT = 'authentication/LOGOUT';

export interface LoginOptions {
  redirectPage: PageNameType;
}

export interface LoginRequestAction extends Action<'authentication/LOGIN_REQUEST'> {
  payload: Credentials;
  meta: { options?: LoginOptions };
}

export interface LoginSuccessAction extends Action<'authentication/LOGIN_SUCCESS'> {
  payload: LoginAPIResponse;
}
export interface LoginFailureAction extends Action<'authentication/LOGIN_FAILURE'> {
  meta: { error: Error };
}

export interface RefreshTokensAction extends Action<'authentication/REFRESH_TOKENS'> {
  payload: { accessToken: string; refreshToken: string };
}

export interface LogoutAction extends Action<'authentication/LOGOUT'> {}

export type AuthenticationActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | RefreshTokensAction
  | LogoutAction;

export const authenticationActionCreators = {
  loginRequest: (credentials: Credentials, options?: LoginOptions): LoginRequestAction => ({
    type: LOGIN_REQUEST,
    payload: { ...credentials },
    meta: { options },
  }),
  loginSuccess: (loginData: LoginAPIResponse): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: loginData,
  }),
  loginFailure: (error: Error): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    meta: { error },
  }),
  refreshTokens: (tokens: { accessToken: string; refreshToken: string }): RefreshTokensAction => ({
    type: REFRESH_TOKENS,
    payload: tokens,
  }),
  logout: (): LogoutAction => ({
    type: LOGOUT,
  }),
};

export interface AuthenticationState {
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
  email?: string;
}

export const initialState: AuthenticationState = {
  accessToken: undefined,
  refreshToken: undefined,
  userId: undefined,
  email: undefined,
};

export const authenticationReducer = (
  state: AuthenticationState = initialState,
  action: AuthenticationActions
): AuthenticationState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      return action.payload;
    case LOGIN_FAILURE:
      return state;
    case REFRESH_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export const selectAccessToken = (state: RootState): string | undefined =>
  state.authentication.accessToken;
export const selectRefreshToken = (state: RootState): string | undefined =>
  state.authentication.refreshToken;
