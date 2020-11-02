import {connect} from 'react-redux';
import {clearChallan} from '../store/actions/mcform.actions';
import {clearPayment} from '../store/actions/collect.actions';
import {PaymentScreen as Payment} from './payment.component';



function mapStateToProps(state) {
  return {
    tenantId: state.login.user.tenantid,
    payment: state.collect.payment,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clearState: () => {
      dispatch(clearChallan());
      dispatch(clearPayment());
    },
  };
};

export const PaymentScreen = connect(mapStateToProps, mapDispatchToProps)(Payment);
