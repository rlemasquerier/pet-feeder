import SnackBarManager from '@bam.tech/react-native-snackbar-dialog';
import throttle from 'lodash/throttle';
import { Platform } from 'react-native';

import theme from '../theme';

// for Android toaster starts from the header bar
// for IOS from the top of the screen so it needs more margin
const TOAST_PADDING_TOP = Platform.select<number>({
  ios: theme.margins.unit * 7,
  android: theme.margins.unit * 5,
});

let isActive = false;

const show: (message: string, isError?: boolean) => void = throttle(
  (message: string, isError?: boolean): void => {
    if (!isActive) {
      isActive = true;
      SnackBarManager.dismiss(() => {
        SnackBarManager.show(message, {
          backgroundColor: isError ? theme.colors.error : theme.colors.primary,
          onAutoDismiss: (): void => {
            isActive = false;
          },
          position: 'top',
          style: { paddingTop: TOAST_PADDING_TOP },
          tapToClose: true,
        });
      });
    }
  },
  2000
);

export const showError = (message: string): void => {
  show(message, true);
};

export const showSuccess = (message: string): void => {
  show(message);
};
