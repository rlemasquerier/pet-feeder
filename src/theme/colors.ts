const baseColors = {
  white: '#FFFFFF',
  black: '#000000',
  orange: '#F3B900',
  blue: '#1C203F',
  lightBlue: '#313A87',
  lightGrey: '#F5F5F5',
  mediumGrey: '#E9ECEF',
  mediumPlusGrey: '#d6d6d6',
  red: '#F5544F',
  brown: '#3C3C3B',
};

const styleguideColors = {
  white: baseColors.white,
  black: baseColors.black,
  primary: baseColors.lightBlue,
  secondary: baseColors.orange,
  banner: baseColors.blue,
  border: baseColors.mediumPlusGrey,
  action: baseColors.red,
  error: baseColors.red,
  placeholderColor: baseColors.mediumGrey,
  secondaryAction: baseColors.brown,
  backgroundColor: baseColors.lightGrey,
};

export default {
  ...styleguideColors,
};
