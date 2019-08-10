import { connect } from 'react-redux';
import { Home, Props } from './Home.component';
import { RootState } from '../../redux/reducer';
import { selectUser } from '../../redux/user/reducer';
import { authenticationActionCreators } from '../../redux/authentication/reducer';

const mapStateToProps = (state: RootState) => ({
  user: selectUser(state),
});

const mapDispatchToProps = {
  logout: authenticationActionCreators.logout,
};

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = typeof mapDispatchToProps;

export const HomeContainer = connect<MapStateToProps, MapDispatchToProps, Props, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Home);
