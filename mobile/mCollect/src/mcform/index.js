import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchServices,
  createDemand,
} from '../store/actioncreators/mcform.actioncreator';
import {MCFormScreen as MCForm} from './mcform.component';

function mapStateToProps(state) {
  return {
    services: state.mcform.services,
    tenantid: state.login.user.tenantid,
    token: state.login.user.token,
    demand: state.mcform.demand,
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {fetchServices: fetchServices, createDemand: createDemand},
    dispatch,
  );

export const MCFormScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MCForm);
