import React from "react";
import { connect } from "react-redux";
//import "./index.css";
import get from "lodash/get";

class downloadFile extends React.Component {
  render() {
    const { label, linkDetail, value } = this.props;
    return (
      <div>
        <div className="fileDownload-label">{label}</div>
        <a className="fileDownload-body" href={value} target="_blank">
          {linkDetail}
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  const { jsonPath, value } = ownprops;
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  let fieldValue =
    value === undefined ? get(preparedFinalObject, jsonPath) : value;
  return { value: fieldValue };
};

export default connect(mapStateToProps)(downloadFile);
