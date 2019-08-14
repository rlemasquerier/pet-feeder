import { connect } from 'react-redux';
import { Loader, Props } from './Loader.component';
import { RootState } from '../../redux/reducer';
import { selectAccessToken } from '../../redux/authentication/reducer';

const mapStateToProps = (state: RootState) => ({
  accessToken: selectAccessToken(state),
});

const mapDispatchToProps = {};

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = typeof mapDispatchToProps;

export const LoaderContainer = connect<MapStateToProps, MapDispatchToProps, Props, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
