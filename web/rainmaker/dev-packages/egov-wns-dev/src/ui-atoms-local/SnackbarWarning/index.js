import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { getDomainLink } from "../../ui-utils/commons";
import Icon from "@material-ui/core/Icon";
import ErrorIcon from '@material-ui/icons/Error';
const styles = {
    color: "rgba(0, 0, 0, 0.87)",
    marginTop: "1%",
    lineHeight: "35px",
    fontSize: "20px",
    border: "1px solid #F5B7B1",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#FADBD8"
};



function AddLinkForProperty(props) {
    const { applicationNumber } = props;
   
    return (
        <div style={styles}>
           <ErrorIcon style={{ color: "red",fontSize:"30px",marginRight:"5px",marginTop:"2px" }}/> <span>  </span><LabelContainer
                labelName={`Edit Property details application no. ${applicationNumber} is under Workflow`} />
        </div>
    );
}


export default AddLinkForProperty;


{/* <Icon >
                <i class="material-icons" style={{ fontSize: "Medium" }}>
                {ErrorIcon}
                      </i>
            </Icon> */}