import React from "react";
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import "./index.css";
import color from "@material-ui/core/colors/amber";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";


const styles = {
  backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
  color: "rgba(255, 255, 255, 0.8700000047683716)",
  paddingLeft: "19px",
  paddingRight: "19px",
  textAlign: "center",
  verticalAlign: "middle",
  lineHeight: "35px",
  fontSize: "16px",
  height: "fit-content"
};

function ApplicationNoContainer(props) {
  
  const { label } = props;
  const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
  return <div style={styles} className = {"lams-application-no"}>
    
    <LabelContainer
      labelName={label.labelValue}
      labelKey={label.labelKey}
    />
    <span> </span> :   <div style={{color:"white",paddingLeft:"5px", fontSize:"16px"}}> {applicationNumber} </div> </div>;

}
export default ApplicationNoContainer;
