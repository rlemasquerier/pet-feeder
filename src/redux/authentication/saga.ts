import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { authenticationActionCreators, LoginRequestAction, LOGIN_REQUEST, LOGOUT } from './reducer';
import { apiCallStart, apiCallSuccess, apiCallError } from '../api/reducer';
import { login } from '../../api/apiClient';
import { navigator } from '../../services/navigation';
import { PAGES } from 'pet-feeder/src/services/navigation';
import { showError } from 'pet-feeder/src/services/toaster.ts';

function handleLoginError(error: AxiosError) {
  if (error.response == undefined) {
    showError('Oups, il semble que tu sois déconnecté');
  } else {
    switch (error.response.status) {
      case 403:
        showError('Veuillez entrer vos identifiants.');
        break;
      case 404:
        showError("Informations d'identifications non valides. Veuillez réessayer.");
        break;
      default:
        showError('Une erreur est survenue.');
        break;
    }
  }
  // eslint-disable-next-line no-console
  console.warn('[loginSaga/error]', error.message);
}

export function* loginSaga(action: LoginRequestAction): SagaIterator {
  try {
    const { email, password } = action.payload;
    const { options } = action.meta;
    yield put(apiCallStart('authentication'));
    const loginResult = yield call(login, email, password);
    yield put(authenticationActionCreators.loginSuccess(loginResult.data));
    yield put(apiCallSuccess('authentication'));
    if (options && options.redirectPage) {
      yield call(navigator.navigate, options.redirectPage);
    } else {
      yield call(navigator.navigate, PAGES.HOME);
    }
  } catch (error) {
    yield put(apiCallError('authentication', error));
    handleLoginError(error);
  }
}

export function* logoutSaga(): SagaIterator {
  yield call(navigator.navigate, PAGES.LOGIN);
}

export function* authenticationSaga(): SagaIterator {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
