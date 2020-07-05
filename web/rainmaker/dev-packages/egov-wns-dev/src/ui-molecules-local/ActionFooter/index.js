import React from "react";
import { connect } from "react-redux";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { Container, Item } from "egov-ui-framework/ui-atoms";
import MenuButton from "egov-ui-framework/ui-molecules/MenuButton";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {getWorkFlowData } from "../../ui-utils/commons"
import { httpRequest } from "../../ui-utils/api";

class Footer extends React.Component {
  state = {
    open: false
  }
  render() {
    let downloadMenu = [];
    const { connectionNumber, tenantId, toggleSnackbar,applicationNo } = this.props;
    const editButton = {
        label: "Edit",
        labelKey: "WS_MODIFY_CONNECTION_BUTTON",
        link: () => {

          // checking for the due amount
          let due = getQueryArg(window.location.href, "due");
          if(due && due !== "0"){            
            toggleSnackbar(
              true,
              {
                labelName: "Due Amount should be zero!",
                labelKey: "WS_DUE_AMOUNT_SHOULD_BE_ZERO"
              },
              "error"
            );

            return false;
          }


          // check for the WF Exists
          const queryObj = [
            { key: "businessIds", value: applicationNo },
            { key: "history", value: true },
            { key: "tenantId", value: tenantId }
          ];        
          httpRequest("post", "/egov-workflow-v2/egov-wf/process/_search", "_search", queryObj).then((payload) => {
            console.log(payload);
            if(payload && payload.ProcessInstances && payload.ProcessInstances[0]['nextActions'] && payload.ProcessInstances[0]['nextActions'].length > 0){
              toggleSnackbar(
                true,
                {
                  labelName: "WorkFlow already Initiated",
                  labelKey: "WS_WORKFLOW_ALREADY_INITIATED"
                },
                "error"
              );

              return false;
            }

          });
          
          let baseURL = "";

          if(process.env.NODE_ENV !== "development"){
             baseURL += "/"+process.env.REACT_APP_NAME.toLowerCase()
          }
            
          this.props.setRoute(
            `${baseURL}/wns/apply?applicationNumber=${applicationNo}&connectionNumber=${connectionNumber}&tenantId=${tenantId}&action=edit&mode=MODIFY`
          );
        }
      };
    //if(applicationType === "MODIFY"){
    downloadMenu && downloadMenu.push(editButton);
    //}
    const buttonItems = {
      label: { labelName: "Take Action", labelKey: "WF_TAKE_ACTION" },
      rightIcon: "arrow_drop_down",
      props: {
        variant: "outlined",
        style: {
          marginRight: 15,
          backgroundColor: "#FE7A51",
          color: "#fff",
          border: "none",
          height: "60px",
          width: "200px"
        }
      },
      menu: downloadMenu
    };

    return (
      <div className="wf-wizard-footer" id="custom-atoms-footer">          
            <Container>
            <Item xs={12} sm={12} className="wf-footer-container">
              <MenuButton data={buttonItems} />
            </Item>
          </Container>
      </div>
    );
  }
}



const mapStateToProps = state => {
  let connectionObj = get(
    state.screenConfiguration.preparedFinalObject,
    "WaterConnection",
    []
  );

  if(connectionObj.length === 0 ){
    connectionObj = get(
      state.screenConfiguration.preparedFinalObject,
      "SewerageConnection",
      []
    );
  }
  const applicationNo = (connectionObj && connectionObj.length > 0)?connectionObj[0].applicationNo:""

  return { state, applicationNo };
};

const mapDispatchToProps = dispatch => {
  return {    
    toggleSnackbar: (open, message, variant) =>
      dispatch(toggleSnackbar(open, message, variant)),
    setRoute: route => dispatch(setRoute(route))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
