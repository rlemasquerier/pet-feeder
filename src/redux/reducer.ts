import { Action, combineReducers } from 'redux';
import { authenticationReducer } from './authentication/reducer';
import { userReducer } from './user/reducer';
import { User, AuthenticationInformation } from '../types/types';

export interface RootState {
  authentication: AuthenticationInformation;
  user: User;
}

export const appReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
});

type RootReducer = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: Action): RootReducer => {
  return appReducer(state, action);
};
