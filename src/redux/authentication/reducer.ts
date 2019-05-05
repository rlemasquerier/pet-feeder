import { Action } from 'redux';
import { Credentials } from '../../types/types';

export const LOGIN_REQUEST = 'authentication/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'authentication/LOGIN_FAILURE';
export const LOGOUT = 'authentication/LOGOUT';

export interface LoginRequestAction extends Action<'authentication/LOGIN_REQUEST'> {
  payload: Credentials;
}

export interface LoginSuccessAction extends Action<'authentication/LOGIN_SUCCESS'> {
  payload: { firebaseUid: string; email: string | null };
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
  loginSuccess: (firebaseUid: string, email: string | null): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: { firebaseUid, email },
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
  firebaseUid?: string;
  email?: string | null;
  name?: string;
  role?: string;
}

export const initialState: AuthenticationState = {
  firebaseUid: undefined,
  email: undefined,
  name: undefined,
  role: undefined,
};

export const authenticationReducer = (
  state: AuthenticationState = initialState,
  action: AuthenticationActions
): AuthenticationState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      return { ...state, firebaseUid: action.payload.firebaseUid, email: action.payload.email };
    case LOGIN_FAILURE:
      return state;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
