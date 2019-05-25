import { connect } from 'react-redux';
import { LoginForm, Props } from './LoginForm.component';
import { RootState } from '../../../redux/reducer';
import { isLoading } from '../../../redux/api/reducer';

const mapStateToProps = (state: RootState) => ({
  isSubmitting: isLoading('authentication')(state),
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

export const LoginFormContainer = connect<MapStateToProps, null, Props, RootState>(
  mapStateToProps,
  null
)(LoginForm);
