import {connect} from 'react-redux';
import {clearDemand} from '../store/actions/mcform.actions';
import {clearPayment} from '../store/actions/collect.actions';
import {PaymentScreen as Payment} from './payment.component';

const mapDispatchToProps = dispatch => {
  return {
    clearState: () => {
      dispatch(clearDemand());
      dispatch(clearPayment());
    },
  };
};

export const PaymentScreen = connect(null, mapDispatchToProps)(Payment);
