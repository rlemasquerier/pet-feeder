import { connect } from 'react-redux';
import { Home, Props } from './Home.component';
import { RootState } from '../../redux/reducer';
import { selectUser } from '../../redux/user/reducer';

const mapStateToProps = (state: RootState) => ({
  user: selectUser(state),
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

export const HomeContainer = connect<MapStateToProps, null, Props, RootState>(
  mapStateToProps,
  null
)(Home);
