import { Action } from 'redux';
import { User } from '../../types/types';

export const USER_DATA_REQUEST = 'user/USER_DATA_REQUEST';
export const USER_DATA_SUCCESS = 'user/USER_DATA_SUCCESS';
export const USER_DATA_FAILURE = 'user/USER_DATA_FAILURE';

export interface UserDataRequestAction extends Action<'user/USER_DATA_REQUEST'> {
  payload: {};
}

export interface UserDataSuccessAction extends Action<'user/USER_DATA_SUCCESS'> {
  payload: { user: User };
}
export interface UserDataFailureAction extends Action<'user/USER_DATA_FAILURE'> {
  meta: { error: Error };
}

export type UserActions = UserDataRequestAction | UserDataSuccessAction | UserDataFailureAction;

export const userActionCreators = {
  userDataRequest: (): UserDataRequestAction => ({
    type: USER_DATA_REQUEST,
    payload: {},
  }),
  userDataSuccess: (user: User): UserDataSuccessAction => ({
    type: USER_DATA_SUCCESS,
    payload: { user },
  }),
  userDataFailure: (error: Error): UserDataFailureAction => ({
    type: USER_DATA_FAILURE,
    meta: { error },
  }),
};

export interface UserState {
  name?: string;
  role?: string;
}

export const initialState: UserState = {
  name: undefined,
  role: undefined,
};

export const userReducer = (state: UserState = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return state;
    case USER_DATA_SUCCESS:
      return { ...state, ...action.payload.user };
    case USER_DATA_FAILURE:
      return state;
    default:
      return state;
  }
};
