import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchTenants,
  loginUser,
} from '../store/actioncreators/login.actioncreator';
import {LoginScreen as Login} from './login.component';

function mapStateToProps(state) {
  const {login} = state;

  return {tenants: login.tenants};
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {fetchTenants: fetchTenants, loginUser: loginUser},
    dispatch,
  );

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
