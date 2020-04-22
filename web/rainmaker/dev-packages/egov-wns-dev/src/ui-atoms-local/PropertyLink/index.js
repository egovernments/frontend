import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";

const styles = {
  color: "rgba(0, 0, 0, 0.87)",
  marginLeft: "3%",
  marginTop: "5%",
  lineHeight: "35px",
  fontSize: "16px"
};

const clickHereStyles = {
  cursor: "pointer",
  textDecoration: "none",
  color: "#FE7A51"
}

function AddLinkForProperty() {
  return (
    <div style={styles}>
      <LabelContainer
        labelName="To Find/Create Property ID"
        labelKey="WS_APPLY_CREATE_MSG" /><span> </span><a href="/pt-common-screens/propertySearch" ><LabelContainer
          style={clickHereStyles}
          labelKey="WS_APPLY_CLICK_HERE" />
      </a>
    </div>
  );
}

export default AddLinkForProperty;
