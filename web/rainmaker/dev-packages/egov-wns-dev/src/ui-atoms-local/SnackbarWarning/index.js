import React from "react";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import Icon from "@material-ui/core/Icon";
import ErrorIcon from '@material-ui/icons/Error';
import get from "lodash/get";
import { connect } from "react-redux";
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
    
class AddLinkForProperty extends React.Component {
    render() {
    const { fieldValue } = this.props;
   
    return (
        <div style={styles}>
           <ErrorIcon style={{ color: "red",fontSize:"30px",marginRight:"5px",marginTop:"2px" }}/> <span>  </span><LabelContainer
                labelName={`Edit Property details application no. ${fieldValue} is under Workflow`} />
        </div>
    );
    }
}

const mapStateToProps = (state, ownprops) => {
    let fieldValue = "";
    const { screenConfiguration } = state;
    const { preparedFinalObject } = screenConfiguration;
      fieldValue = get(preparedFinalObject, "applyScreen.property.acknowldgementNumber");
  
    return { fieldValue };
  };
  
  export default connect(mapStateToProps)(AddLinkForProperty);

