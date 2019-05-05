import { connect } from 'react-redux';
import { Loader, Props } from './Loader.component';
import { RootState } from '../../redux/reducer';
import { authenticationActionCreators } from '../../redux/authentication/reducer';
import { userActionCreators } from '../../redux/user/reducer';

const mapDispatchToProps = {
  onLoginSuccess: authenticationActionCreators.loginSuccess,
  onUserDataSuccess: userActionCreators.userDataSuccess,
};

type MapDispatchToProps = typeof mapDispatchToProps;

export const LoaderContainer = connect<null, MapDispatchToProps, Props, RootState>(
  null,
  mapDispatchToProps
)(Loader);
