import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchBill,
  createPayment,
} from '../store/actioncreators/collect.actioncreator';
import {CollectScreen as Collect} from './collect.component';

function mapStateToProps(state) {
  return {
    services: state.mcform.services,
    tenantId: state.login.user.tenantid,
    token: state.login.user.token,
    bill: state.collect.bill,
    payment: state.collect.payment,
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {fetchBill: fetchBill, createPayment: createPayment},
    dispatch,
  );

export const CollectScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Collect);
