import { ForkEffectDescriptor, SimpleEffect } from 'redux-saga/effects';

export function* rootSaga(): IterableIterator<SimpleEffect<'FORK', ForkEffectDescriptor>> {}
