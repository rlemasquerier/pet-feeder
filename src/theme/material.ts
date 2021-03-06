import colors from './colors';
import borders from './borders';

const material = {
  dark: false,
  roundness: borders.radius,
  colors: {
    primary: colors.primary,
    accent: colors.primary,
    background: colors.backgroundColor,
    surface: colors.black,
    text: colors.black,
    disabled: colors.backgroundColor,
    placeholder: colors.black,
    backdrop: '#00000055',
    error: colors.action,
  },
};

export default material;
