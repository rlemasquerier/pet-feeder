const baseColors = {
  white: '#FFFFFF',
  black: '#000000',
  orange: '#F3B900',
  blue: '#1C203F',
  lightGrey: '#F5F5F5',
  red: '#F5544F',
  brown: '#3C3C3B',
};

const styleguideColors = {
  white: baseColors.white,
  black: baseColors.black,
  primary: baseColors.orange,
  banner: baseColors.blue,
  action: baseColors.red,
  secondaryAction: baseColors.brown,
  backgroundColor: baseColors.lightGrey,
};

export default {
  ...styleguideColors,
};
