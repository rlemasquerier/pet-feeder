import { connect } from 'react-redux';
import { Signup, Props } from './Signup.component';
import { RootState } from '../../redux/reducer';
import { authenticationActionCreators } from '../../redux/authentication/reducer';

const mapDispatchToProps = {
  login: authenticationActionCreators.loginRequest,
};

type MapDispatchToProps = typeof mapDispatchToProps;

export const SignupContainer = connect<null, MapDispatchToProps, Props, RootState>(
  null,
  mapDispatchToProps
)(Signup);
