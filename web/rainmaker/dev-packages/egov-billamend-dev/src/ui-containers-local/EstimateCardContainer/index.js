import React, { Component } from "react";
import FeesEstimateCard  from "../../ui-molecules-local/FeeEstimateCard"

import { connect } from "react-redux";
import get from "lodash/get";

class EstimateCardContainer extends Component {
  render() {
    return <FeesEstimateCard estimate={this.props.estimate} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const fees = [{ "name": { "labelName": "TL_RENEWAL_TAX", "labelKey": "TL_RENEWAL_TAX" }, "value": 250, "info": "" }, { "name": { "labelName": "TL_RENEWAL_REBATE", "labelKey": "TL_RENEWAL_REBATE" }, "value": -25, "info": "" }, { "name": { "labelName": "TL_RENEWAL_PENALTY", "labelKey": "TL_RENEWAL_PENALTY" }, "value": 0, "info": "" }];
  const estimate = {
    header: { labelName: "Fee Estimate", labelKey: "TL_SUMMARY_FEE_EST" },
    fees,
    extra: [
      { textLeft: "Last Date for Rebate (20% of TL)" },
      //   {
      //     textLeft: "Penalty (10% of TL) applicable from"
      //   },
      //   { textLeft: "Additional Penalty (20% of TL) applicable from" }
    ]
  };
  return { estimate };
};

export default connect(
  mapStateToProps,
  null
)(EstimateCardContainer);
