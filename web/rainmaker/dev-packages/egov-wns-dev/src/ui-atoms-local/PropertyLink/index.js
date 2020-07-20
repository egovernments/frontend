import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { getDomainLink } from "../../ui-utils/commons";
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

function AddLinkForProperty(props) {
  const { url,isMode } = props;
  let link = window.location.origin;  
  link += `${getDomainLink()}/pt-common-screens/propertySearch?redirectUrl=${url}`;
  if(isMode==="MODIFY"){
    return (
      <div style={styles}>
        <a href={`${link}`} ><LabelContainer
            style={clickHereStyles}
            labelKey="WS_SEARCH_PROPERTY" />
        </a> <span> </span>
        <LabelContainer
            style={clickHereStyles}
            labelKey="WS_MODIFY_PROPERTY" />
      </div>
    );
  }else{
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

export default AddLinkForProperty;
