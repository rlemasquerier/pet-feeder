import { connect } from 'react-redux';
import { Signup } from './Signup.component';
import { RootState } from '../../redux/reducer';
import { authenticationActionCreators } from '../../redux/authentication/reducer';

const mapDispatchToProps = {
  login: authenticationActionCreators.loginRequest,
};

type MapDispatchToProps = typeof mapDispatchToProps;

export type ContainerProps = MapDispatchToProps;

export const SignupContainer = connect<null, MapDispatchToProps, ContainerProps, RootState>(
  null,
  mapDispatchToProps
)(Signup);
