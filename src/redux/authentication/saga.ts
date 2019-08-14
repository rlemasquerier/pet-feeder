import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { authenticationActionCreators, LoginRequestAction, LOGIN_REQUEST, LOGOUT } from './reducer';
import { apiCallStart, apiCallSuccess, apiCallError } from '../api/reducer';
import { login, LoginAxiosResponse } from '../../api/apiClient';
import { navigator } from '../../services/navigation';

export function* loginSaga(action: LoginRequestAction): SagaIterator {
  try {
    const { email, password } = action.payload;
    yield put(apiCallStart('authentication'));
    const loginResult: LoginAxiosResponse = yield call(login, email, password);
    yield put(authenticationActionCreators.loginSuccess(loginResult.data));
    yield put(apiCallSuccess('authentication'));
    yield call(navigator.navigate, 'Home');
  } catch (error) {
    yield put(apiCallError('authentication', error));
    // eslint-disable-next-line no-console
    console.warn('[loginSaga/error]', error.message);
  }
}

export function* logoutSaga(): SagaIterator {
  yield call(navigator.navigate, 'Login');
}

export function* authenticationSaga(): SagaIterator {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
