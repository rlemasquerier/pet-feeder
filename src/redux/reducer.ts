import { Action, combineReducers } from 'redux';
import { authenticationReducer, AuthenticationState } from './authentication/reducer';
import { apiReducer, ApiState } from './api/reducer';

export interface RootState {
  authentication: AuthenticationState;
  api: ApiState;
}

export const appReducer = combineReducers({
  authentication: authenticationReducer,
  api: apiReducer,
});

type RootReducer = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: Action): RootReducer => {
  return appReducer(state, action);
};
