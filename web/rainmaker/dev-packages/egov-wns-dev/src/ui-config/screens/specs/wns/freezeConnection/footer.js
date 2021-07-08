import React from "react";
import { connect } from "react-redux";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { Container, Item } from "egov-ui-framework/ui-atoms";
import MenuButton from "egov-ui-framework/ui-molecules/MenuButton";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {
  getWorkFlowData,
  getDomainLink,
  isWorkflowExists,
} from "../../../../../ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import store from "ui-redux/store";
import { showHideAdhocPopup ,ifUserRoleExists} from "../../utils";
// import { getRequiredDocData, showHideAdhocPopup } from "egov-billamend/ui-config/screens/specs/utils"
class Footer extends React.Component {
  state = {
    open: false,
  };
  render() {
    let downloadMenu = [];
    //Connection number was not properly populated(Old application was populating) in edit window
    const {
      //connectionNumber,
      tenantId,
      toggleSnackbar,
     // applicationNo,
      applicationNos,
      businessService,
      bill,
      state
    } = this.props;
    const editButton = {
      label: "Submit",
      labelKey: "WS_SUBMIT_BUTTON",
      link: async () => {     
        const connectionObj = get(state.screenConfiguration.preparedFinalObject,"WaterConnection[0]");  
        let connectionNumber = connectionObj.connectionNo
        let applicationNo = connectionObj.applicationNo
        //let applicationNos = connectionObj.applicationNo
        
       

        // check for the WF Exists
        const queryObj = [
          { key: "businessIds", value: applicationNos },
          { key: "tenantId", value: tenantId },
        ];

        let isApplicationApproved = await isWorkflowExists(queryObj);

         
          if (!isApplicationApproved ) {
            toggleSnackbar(
              true,
              {
                labelName: "WorkFlow already Initiated",
                labelKey: "WS_WORKFLOW_ALREADY_INITIATED",
              },
              "error"
            );
            return false;
          }
          store.dispatch(
            setRoute(
              `/wns/apply?applicationNumber=${applicationNo}&connectionNumber=${connectionNumber}&tenantId=${tenantId}&action=edit&mode=MODIFY`
            )
          );
 
      },
    };
   
    //if(applicationType === "MODIFY"){
    downloadMenu && downloadMenu.push(editButton);
    
   /* if (
      businessService.includes("ws-services-calculation") ||
      businessService.includes("sw-services-calculation")
    ) {
      if (bill.Bill && bill.Bill.length > 0) {
        downloadMenu && downloadMenu.push(BillAmendment);
      }
    }*/

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
          width: "200px",
        },
      },
      menu: downloadMenu,
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

const mapStateToProps = (state) => {
  let connectionObj = get(
    state.screenConfiguration.preparedFinalObject,
    "WaterConnection",
    []
  );



  /* For WorkFlow check */
  let applicationNos = get(
    state.screenConfiguration.preparedFinalObject,
    "applicationNos",
    []
  );
  let bill = get(
    state.screenConfiguration.preparedFinalObject,
    "BILL_FOR_WNS",
    ""
  );
  let connectDetailsData = get(
    state.screenConfiguration.preparedFinalObject,
    "connectDetailsData"
  );

  if (connectionObj.length === 0) {
    connectionObj = get(
      state.screenConfiguration.preparedFinalObject,
      "SewerageConnection",
      []
    );
  }
  const applicationNo =
    connectionObj && connectionObj.length > 0
      ? connectionObj[0].applicationNo
      : "";
 

  const businessService = connectDetailsData.BillingService.BusinessService.map(
    (item) => {
      return item.businessService;
    }
  );
  return { state, applicationNo, applicationNos, businessService, bill };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbar: (open, message, variant) =>
      dispatch(toggleSnackbar(open, message, variant)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
