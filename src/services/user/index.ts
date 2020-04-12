/* eslint-disable @typescript-eslint/no-explicit-any */

import { Alert } from 'react-native';
import { User } from 'pet-feeder/src/types';

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any
  ? P
  : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R
  ? R
  : any;

export function withBlockedUserCheck<T extends (...args: any[]) => any>(
  func: T,
  user: User | undefined
): (...funcArgs: Parameters<T>) => ReturnType<T> | undefined {
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (user && user.status === 'blocked') {
      Alert.alert('Arrête de tricher, Huber !\n Hahahahaha !!!');
      return;
    }
    return func(...args);
  };
}
