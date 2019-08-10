import { Action } from 'redux';
import { Credentials } from '../../types/types';
import { RootState } from '../reducer';
import { LoginAPIResponse } from '../../api/apiClient';

export const LOGIN_REQUEST = 'authentication/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'authentication/LOGIN_FAILURE';
export const LOGOUT = 'authentication/LOGOUT';

export interface LoginRequestAction extends Action<'authentication/LOGIN_REQUEST'> {
  payload: Credentials;
}

export interface LoginSuccessAction extends Action<'authentication/LOGIN_SUCCESS'> {
  payload: LoginAPIResponse;
}
export interface LoginFailureAction extends Action<'authentication/LOGIN_FAILURE'> {
  meta: { error: Error };
}

export interface LogoutAction extends Action<'authentication/LOGOUT'> {}

export type AuthenticationActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

export const authenticationActionCreators = {
  loginRequest: (credentials: Credentials): LoginRequestAction => ({
    type: LOGIN_REQUEST,
    payload: { ...credentials },
  }),
  loginSuccess: (loginData: LoginAPIResponse): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: loginData,
  }),
  loginFailure: (error: Error): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    meta: { error },
  }),
  logout: (): LogoutAction => ({
    type: LOGOUT,
  }),
};

export interface AuthenticationState {
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
}

export const initialState: AuthenticationState = {
  accessToken: undefined,
  refreshToken: undefined,
  userId: undefined,
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
