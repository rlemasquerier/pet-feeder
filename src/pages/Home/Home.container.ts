import { connect } from 'react-redux';
import { Home, Props } from './Home.component';
import { withConnectedUser } from '../../hoc/withConnectedUser';
import { RootState } from '../../redux/reducer';
import { authenticationActionCreators } from '../../redux/authentication/reducer';
import { compose } from 'recompose';
import { withApollo } from 'react-apollo';
import { withNotificationsTokenRefresh } from 'pet-feeder/src/hoc/withNotificationsTokenRefresh';

const mapDispatchToProps = {
  logout: authenticationActionCreators.logout,
};

type MapDispatchToProps = typeof mapDispatchToProps;

export const HomeContainer = compose<Props, Props>(
  connect<null, MapDispatchToProps, Props, RootState>(
    null,
    mapDispatchToProps
  ),
  withApollo,
  withConnectedUser,
  withNotificationsTokenRefresh
)(Home);
