import { Action, combineReducers } from 'redux';
import { authenticationReducer, AuthenticationState } from './authentication/reducer';

export interface RootState {
  authentication: AuthenticationState;
}

export const appReducer = combineReducers({
  authentication: authenticationReducer,
});

type RootReducer = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: Action): RootReducer => {
  return appReducer(state, action);
};
