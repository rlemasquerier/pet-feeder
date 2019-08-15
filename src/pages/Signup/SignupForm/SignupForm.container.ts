import { connect } from 'react-redux';
import { SignupForm, Props } from './SignupForm.component';
import { RootState } from '../../../redux/reducer';
import { isLoading } from '../../../redux/api/reducer';

const mapStateToProps = (state: RootState) => ({
  isSubmitting: isLoading('authentication')(state),
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

export const SignupFormContainer = connect<MapStateToProps, null, Props, RootState>(
  mapStateToProps,
  null
)(SignupForm);
