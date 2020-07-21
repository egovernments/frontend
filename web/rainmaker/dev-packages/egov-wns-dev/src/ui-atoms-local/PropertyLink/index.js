import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { getDomainLink } from "../../ui-utils/commons";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { connect } from "react-redux";
import get from "lodash/get";
const styles = {
  color: "rgba(0, 0, 0, 0.87)",
  marginLeft: "3%",
  marginTop: "7%",
  lineHeight: "35px",
  fontSize: "16px"
};

const clickHereStyles = {
  cursor: "pointer",
  textDecoration: "none",
  color: "#FE7A51"
}
class AddLinkForProperty extends React.Component {
  render() {
    const { url,isMode, selectedPropertyId } = this.props;
    let link = window.location.origin;  
    link += `${getDomainLink()}/pt-common-screens/propertySearch?redirectUrl=${url}`;
    const tenantId = getQueryArg(window.location.href, "tenantId");
    let modifyLink = window.location.origin + `/property-tax/assessment-form?purpose=update&propertyId=${selectedPropertyId}&tenantId=${ tenantId }&redirectTo=${url}`
    if(isMode==="MODIFY"){
      return (
        <div style={styles}>
          <a href={`${link}`} ><LabelContainer
              style={clickHereStyles}
              labelKey="WS_SEARCH_PROPERTY" />
          </a> <span> </span>
          <a href={`${modifyLink}`} >
              <LabelContainer
              style={clickHereStyles}
              labelKey="WS_MODIFY_PROPERTY" />
          </a>
        </div>
      );
    } else {
      return (
        <div style={styles}>
          <LabelContainer
            labelName="To Find/Create Property ID"
            labelKey="WS_APPLY_CREATE_MSG" /><span> </span><a href={`${link}`} ><LabelContainer
              style={clickHereStyles}
              labelKey="WS_APPLY_CLICK_HERE" />
          </a>
        </div>
      );
    }
  }
}
const mapStateToProps = (state, ownprops) => {
  let selectedPropertyId = "";
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  selectedPropertyId = get(preparedFinalObject, "applyScreen.property.propertyId");

  return { selectedPropertyId };
};

export default connect(mapStateToProps)(AddLinkForProperty);
