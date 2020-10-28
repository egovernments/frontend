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
  const fees = JSON.parse(`[{ "name": { "labelName": "TL_RENEWAL_TAX", "labelKey": "TL_RENEWAL_TAX" }, "value": 250, "info": "" }, { "name": { "labelName": "TL_RENEWAL_REBATE", "labelKey": "TL_RENEWAL_REBATE" }, "value": -25, "info": "" }, { "name": { "labelName": "TL_RENEWAL_PENALTY", "labelKey": "TL_RENEWAL_PENALTY" }, "value": 0, "info": "" }]`);
  
  const estimate = {
    fees,
    extra: [
      { textLeft: "The approval note amount will be automatically applied in the upcoming bill" },
    ]
  };
  return { estimate };
};

export default connect(
  mapStateToProps,
  null
)(EstimateCardContainer);
