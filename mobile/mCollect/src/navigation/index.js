import {connect} from 'react-redux';
import {AppNavigator as Navigator} from './app.navigator';

const mapStateToProps = state => {
  return {user: state.login.user};
};

export const AppNavigator = connect(mapStateToProps)(Navigator);
