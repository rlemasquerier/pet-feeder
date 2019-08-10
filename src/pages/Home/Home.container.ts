import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Home, Props } from './Home.component';
import { getConnectedUser } from '../../graphql/queries';
import { RootState } from '../../redux/reducer';
import { authenticationActionCreators } from '../../redux/authentication/reducer';
import { compose } from 'recompose';

const mapDispatchToProps = {
  logout: authenticationActionCreators.logout,
};

type MapDispatchToProps = typeof mapDispatchToProps;

export const HomeContainer = compose(
  connect<null, MapDispatchToProps, Props, RootState>(
    null,
    mapDispatchToProps
  ),
  graphql(getConnectedUser, {
    props: ({ data: { me } }) => ({
      user: me,
    }),
  })
)(Home);
