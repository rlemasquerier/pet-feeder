import { fork, ForkEffectDescriptor, SimpleEffect } from 'redux-saga/effects';
import { authenticationSaga } from './authentication/saga';

export function* rootSaga(): IterableIterator<SimpleEffect<'FORK', ForkEffectDescriptor>> {
  yield fork(authenticationSaga);
}
