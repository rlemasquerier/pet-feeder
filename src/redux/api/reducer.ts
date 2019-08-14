import { RootState } from '../reducer';
import { Action } from 'redux';

type ModuleName = 'authentication';

export const API_CALL_START = 'api/API_CALL_START';
export const API_CALL_SUCCESS = 'api/API_CALL_SUCCESS';
export const API_CALL_ERROR = 'api/API_CALL_ERROR';

interface ApiCallStartAction extends Action<'api/API_CALL_START'> {
  meta: { name: ModuleName };
}

interface ApiCallSuccessAction extends Action<'api/API_CALL_SUCCESS'> {
  meta: { name: ModuleName };
}

export interface ApiCallErrorAction extends Action<'api/API_CALL_ERROR'> {
  meta: { name: ModuleName; requestError: Error };
}

export type ApiActions = ApiCallStartAction | ApiCallSuccessAction | ApiCallErrorAction;

// ACTIONS
export const apiCallStart = (name: ModuleName): ApiCallStartAction => ({
  type: API_CALL_START,
  meta: {
    name,
  },
});

export const apiCallSuccess = (name: ModuleName): ApiCallSuccessAction => ({
  type: API_CALL_SUCCESS,
  meta: {
    name,
  },
});

export const apiCallError = (name: ModuleName, requestError: Error): ApiCallErrorAction => ({
  type: API_CALL_ERROR,
  meta: {
    name,
    requestError,
  },
});

export interface ApiState {
  [key: string]: {
    error?: Error;
    loading: boolean;
  };
}

// SELECTORS
export const initialState: ApiState = {};

export const isLoading = (name: ModuleName): ((state: RootState) => boolean) => (
  state: RootState
): boolean => {
  return state.api[name] ? state.api[name].loading : false;
};

export const hasError = (name: ModuleName): ((state: RootState) => boolean) => (
  state: RootState
): boolean => {
  return state.api[name] ? !!state.api[name].error : false;
};

export const selectError = (name: ModuleName): ((state: RootState) => Error | undefined) => (
  state: RootState
): Error | undefined => {
  return state.api[name] && state.api[name].error;
};

export const apiReducer = (state: ApiState = initialState, action: ApiActions): ApiState => {
  switch (action.type) {
    case API_CALL_START: {
      return {
        ...state,
        [action.meta.name]: {
          ...state[action.meta.name],
          loading: true,
          error: undefined,
        },
      };
    }
    case API_CALL_SUCCESS: {
      return {
        ...state,
        [action.meta.name]: {
          ...state[action.meta.name],
          loading: false,
          error: undefined,
        },
      };
    }
    case API_CALL_ERROR: {
      return {
        ...state,
        [action.meta.name]: {
          ...state[action.meta.name],
          loading: false,
          error: action.meta.requestError,
        },
      };
    }
    default:
      return state;
  }
};
