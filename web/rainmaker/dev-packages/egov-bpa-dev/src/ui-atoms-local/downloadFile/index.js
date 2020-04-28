import React from "react";
import { connect } from "react-redux";
//import "./index.css";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import { getLocaleLabels, getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

const styles = {
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
    // fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.375em',
  },
  linkDetails : {
    // color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: 'Roboto',
    lineHeight: '19px',
    letterSpacing: '0.67px',
    textDecoration : 'none'
  }
};

class downloadFile extends React.Component {
  render() {
    const { label = {}, linkDetail= {}, value, classes, localizationLabels  } = this.props;
    let translatedLabel = getLocaleLabels(
      label.labelName,
      label.labelKey,
      localizationLabels
    );
    let translatedLabelLink = getLocaleLabels(
      linkDetail.labelName,
      linkDetail.labelKey,
      localizationLabels
    );

    return (
      <div>
        <div className={classes.root}>{translatedLabel}</div>
        <a className={classes.linkDetails} href={value} target="_blank">
          {translatedLabelLink}
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  let { jsonPath, value, linkDetail } = ownprops;
  const { screenConfiguration, app } = state;
  const { localizationLabels } = app;
  const { preparedFinalObject } = screenConfiguration;
  let fieldValue =
    value === undefined ? get(preparedFinalObject, jsonPath) : value;
    if(jsonPath == "ocScrutinyDetails.permitNumber") {
      let tenantId = getQueryArg(window.location.href, "tenantId");
      let permitNumber = get(state.screenConfiguration.preparedFinalObject, "bpaDetails.applicationNo", "");
      let checkingApp = getTenantId().split('.')[1] ? "employee" : "citizen";
      let url = `${window.location.origin}/egov-bpa/search-preview?applicationNumber=${permitNumber}&tenantId=${tenantId}`;
      if(process.env.NODE_ENV === "production") {
        if(checkingApp){
          url = `${window.location.origin}/${checkingApp}/egov-bpa/search-preview?applicationNumber=${permitNumber}&tenantId=${tenantId}`;
        }
      }
      if(permitNumber) {
        fieldValue = url;
        linkDetail = {
          labelName: permitNumber,
          labelKey: permitNumber
        }
      }
    }
  return { value: fieldValue, localizationLabels, linkDetail };
};

export default withStyles(styles)(connect(mapStateToProps)(downloadFile));
