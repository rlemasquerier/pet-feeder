import { Action, combineReducers } from 'redux';
import { authenticationReducer, AuthenticationState } from './authentication/reducer';
import { userReducer } from './user/reducer';
import { apiReducer, ApiState } from './api/reducer';
import { User } from '../types/types';

export interface RootState {
  authentication: AuthenticationState;
  user: User;
  api: ApiState;
}

export const appReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  api: apiReducer,
});

type RootReducer = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: Action): RootReducer => {
  return appReducer(state, action);
};
