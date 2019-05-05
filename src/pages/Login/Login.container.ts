import { connect } from 'react-redux';
import { Login, Props } from './Login.component';
import { RootState } from '../../redux/reducer';
import { authenticationActionCreators } from '../../redux/authentication/reducer';

const mapDispatchToProps = {
  onPressLogin: authenticationActionCreators.loginRequest,
};

type MapDispatchToProps = typeof mapDispatchToProps;

export const LoginContainer = connect<null, MapDispatchToProps, Props, RootState>(
  null,
  mapDispatchToProps
)(Login);
