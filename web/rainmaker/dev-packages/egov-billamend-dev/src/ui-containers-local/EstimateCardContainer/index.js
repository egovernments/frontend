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
  const fees = JSON.parse(`[{ "name": { "labelName": "WATER_TAX", "labelKey": "WATER_TAX" }, "value": 1000, "info": "" }, { "name": { "labelName": "WATER_CESS", "labelKey": "WATER_CESS" }, "value": 200, "info": "" }, { "name": { "labelName": "INTEREST", "labelKey": "INTEREST" }, "value": 100, "info": "" },{ "name": { "labelName": "PENALTY", "labelKey": "PENALTY" }, "value": 100, "info": "" }]`);
  
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
