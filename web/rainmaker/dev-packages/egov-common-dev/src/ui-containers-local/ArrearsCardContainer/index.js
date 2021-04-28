import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import React, { Component } from "react";
import { connect } from "react-redux";
import ArrearsMolecule from "../../ui-molecules-local/ArrearsMolecule";

const getBillingPeriod = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  if (toDate.getYear() - fromDate.getYear() != 0) {
    return `FY${fromDate.getYear() + 1900}-${toDate.getYear() - 100}`;
  }
  return `${fromDate.toLocaleDateString()}-${toDate.toLocaleDateString()}`;
}


class ArrearsCardContainer extends Component {
  state = {
    showArrearsCard: false
  }
  constructor(props) {
    super(props);

  }
  buttonOnClick = () => {
    this.setState({ showArrearsCard: !this.state.showArrearsCard });
  }
  render() {
    return (<div>
      {!this.state.showArrearsCard && <LabelContainer
        labelName={'CS_ARREARS_DETAILS'}
        labelKey={'CS_ARREARS_DETAILS'}
      />}
      {this.props.isArrears && this.state.showArrearsCard && <ArrearsMolecule fees={this.props.estimate.fees}></ArrearsMolecule>}
      {!this.props.isArrears && this.state.showArrearsCard && <LabelContainer
        labelName={'CS_NO_ARREARS'}
        labelKey={'CS_NO_ARREARS'}
      />}
      {this.state.showArrearsCard && <button style={{ float: "right", color: '#FE7A51' , border: '0px'}} onClick={this.buttonOnClick}><LabelContainer
        labelName={'CS_SHOW_CARD'}
        labelKey={'CS_SHOW_CARD'}
      /></button>}
      {!this.state.showArrearsCard && <button style={{ float: "right", color: '#FE7A51'   , border: '0px' }} onClick={this.buttonOnClick}><LabelContainer
        labelName={'CS_HIDE_CARD'}
        labelKey={'CS_HIDE_CARD'}
      /></button>}
    </div>);
  }
}

const sortBillDetails = (billDetails = []) => {
  let sortedBillDetails = [];
  sortedBillDetails = billDetails.sort((x, y) => y.fromPeriod - x.fromPeriod);
  //  let billLengths=billDetails.map(bill=>bill.billAccountDetails.length);

  //   let max = Math.max( ...billLengths );
  //  let ind= billLengths.findIndex(x=>x==max)
  //  billDetails[ind].billAccountDetails(bills=>{
  //   bills.taxHeadCode
  //   sortedBillDetails
  //  })
  //   sortedBillDetails.map(bill=>{
  //     if(bill.billAccountDetails.length!=max){
  //       bill.billAccountDetails.push({taxHeadCode:"NA",amount:0})
  //     }
  //   })



  return sortedBillDetails;
}
const formatTaxHeaders = (billDetail = {}) => {

  let formattedFees = []
  const { billAccountDetails = [] } = billDetail;
  const billAccountDetailsSorted = orderBy(
    billAccountDetails,
    ["amount"],
    ["asce"]);
  formattedFees = billAccountDetailsSorted.map((taxHead) => {
    return {
      info: {
        labelKey: taxHead.taxHeadCode,
        labelName: taxHead.taxHeadCode
      },
      name: {
        labelKey: taxHead.taxHeadCode,
        labelName: taxHead.taxHeadCode
      },
      value: taxHead.amount
    }
  })
  formattedFees.reverse();
  formattedFees.push({
    info: {
      labelKey: 'TL_COMMON_TOTAL_AMT',
      labelName: 'TL_COMMON_TOTAL_AMT'
    },
    name: {
      labelKey: 'TL_COMMON_TOTAL_AMT',
      labelName: 'TL_COMMON_TOTAL_AMT'
    },
    value: billDetail.amount
  }
  )
  return formattedFees;
}


const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;

  let fees = {};
  let sortedBillDetails = [...sortBillDetails(get(screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails", []))];

  sortedBillDetails.shift();
  sortedBillDetails.map(bill => {
    let fee = formatTaxHeaders(bill);
    fees[getBillingPeriod(bill.fromPeriod, bill.toPeriod)] = fee;
  })

  const billDetails = get(screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails", []);
  const isArrears = get(screenConfiguration, "preparedFinalObject.isArrears");
  let totalAmount = 0;
  let arrears = 0;
  for (let billDetail of billDetails) {
    totalAmount += billDetail.amount;

  }
  if (totalAmount > 0) {
    arrears = totalAmount - billDetails[0].amount;
    arrears = arrears.toFixed(2);
  }


  const estimate = {
    header: { labelName: "Fee Estimate", labelKey: "NOC_FEE_ESTIMATE_HEADER" },
    fees,
    totalAmount,
    arrears
  };
  return { estimate, isArrears };
};

export default connect(
  mapStateToProps,
  null
)(ArrearsCardContainer);
