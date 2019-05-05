import { Action, combineReducers } from 'redux';
import { authenticationReducer, AuthenticationState } from './authentication/reducer';
import { userReducer, UserState } from './user/reducer';

export interface RootState {
  authentication: AuthenticationState;
  user: UserState;
}

export const appReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
});

type RootReducer = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: Action): RootReducer => {
  return appReducer(state, action);
};
