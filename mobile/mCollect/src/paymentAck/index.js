import {connect} from 'react-redux';
import {clearChallan} from '../store/actions/mcform.actions';
import {PaymentAckScreen as PayAck} from './payack.component';
import { clearPayment } from '../store/actions/collect.actions';



function mapStateToProps(state) {
  return {
    tenantId: state.login.user.tenantid,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clearChallanState: () => {
      dispatch(clearChallan());
      dispatch(clearPayment());
    },
  };
};

export const PaymentAckScreen = connect(mapStateToProps,mapDispatchToProps)(PayAck);
