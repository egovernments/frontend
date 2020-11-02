import {connect} from 'react-redux';
import {clearChallan} from '../store/actions/mcform.actions';
import {ChallanAckScreen as Challan} from './challan.component';



function mapStateToProps(state) {
  return {
    tenantId: state.login.user.tenantid,
    challans: state.mcform.challans,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clearChallanState: () => {
      dispatch(clearChallan());
    },
  };
};

export const ChallanAckScreen = connect(mapStateToProps,mapDispatchToProps)(Challan);
