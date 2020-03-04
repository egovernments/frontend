import React, { Component } from "react";
import  MultiDownloadCard  from "../../ui-molecules-local/MultiDownloadCard";
import { connect } from "react-redux";
import get from "lodash/get";
import "./index.scss";
import {
  localStorageGet,
} from "egov-ui-kit/utils/localStorageUtils";

class DownloadFileContainer extends Component {
  state = {
    createdBy: ""
  }
  componentDidMount = () => {
    this.getUserDataFromUuid()         
  }  

  getUserDataFromUuid() {
    const userInfo = JSON.parse(
      localStorageGet("user-info")
    );
    if(userInfo && userInfo.roles && userInfo.roles.length > 1) {
      let roles = [];
      for( let i = 0; i < userInfo.roles.length; i++) {
        roles.push(userInfo.roles[i].name);
      };
      if(roles.includes("Citizen")) {
        roles.map( role => {
          role && role === "BPA Architect" && (
            this.setState({
              createdBy: role
            })
          )
        })
      }
      else if(roles.includes("Employee")) {
        roles.map( role => {
          role && role === "BPA Services Approver" || role === "BPA Services verifier" && (
            this.setState({
              createdBy: role
            })
          )
        })
      }
    }    
  }

  render() {
    const { data, documentData, bpaDetails, ...rest} = this.props;
    if (this.state.createdBy == "") {
      {
        data && data.length > 0
        for (let key in documentData) {
          documentData[key].previewdocuments &&
          documentData[key].previewdocuments.map(docs => {
            data.push(docs);
          })
        }

      }
    } else {
      {
        data && data.length > 0
        data.map(docs => {
          bpaDetails && bpaDetails.documents &&
          bpaDetails.documents.map(doc => {
            if (doc && docs && doc.fileStoreId === docs.fileStoreId) {
              docs.wfState = doc.wfState;
              docs.createdBy = this.state.createdBy;
            }
          })
        })
      }
    }
    return (
      <MultiDownloadCard data={data} documentData={documentData} {...rest} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const data = get(
    screenConfiguration.preparedFinalObject,
    ownProps.sourceJsonPath,
    []
  );
  const documentData = get(
    screenConfiguration.preparedFinalObject,
    "documentDetailsUploadRedux",
    []
  );
  const bpaDetails = get(
    screenConfiguration.preparedFinalObject,
    "BPA",
    {}
  );
  return { data, documentData, bpaDetails };
};

export default connect(
  mapStateToProps,
  null
)(DownloadFileContainer);
