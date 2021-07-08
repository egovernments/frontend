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
} from "../../ui-utils/commons";
import { httpRequest } from "../../ui-utils/api";
import store from "ui-redux/store";
import { 
  isModifyMode,
  isFreezeMode
} from "../../ui-utils/commons";
import { showHideAdhocPopup ,ifUserRoleExists} from "../../ui-config/screens/specs/utils";
// import { getRequiredDocData, showHideAdhocPopup } from "egov-billamend/ui-config/screens/specs/utils"

const moveToSuccess = (combinedArray, dispatch) => {
  const tenantId = get(combinedArray[0].property, "tenantId") || getQueryArg(window.location.href, "tenantId");
  const purpose = "apply";
  const status = "success";
  const applicationNoWater = get(combinedArray[0], "applicationNo");
  const applicationNoSewerage = get(combinedArray[1], "applicationNo");
  let mode = (isModifyMode()) ? "&mode=MODIFY" : (isFreezeMode()) ? "&mode=FREEZE" : ""
  console.log("mode---",mode);
  if (applicationNoWater && applicationNoSewerage) {
    dispatch(
      setRoute(
        `/wns/acknowledgement?purpose=${purpose}&status=${status}&applicationNumberWater=${applicationNoWater}&applicationNumberSewerage=${applicationNoSewerage}&tenantId=${tenantId}${mode}`
      )
    );
  } else if (applicationNoWater) {
    dispatch(
      setRoute(
        `/wns/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNoWater}&tenantId=${tenantId}${mode}`
      )
    );
  } else {
    dispatch(
      setRoute(
        `/wns/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNoSewerage}&tenantId=${tenantId}${mode}`
      )
    );
  }
};

class Footer extends React.Component {
  state = {
    open: false,
  };
  render() {
    let isFormValid = true;
    let downloadMenu = [];
    //Connection number was not properly populated(Old application was populating) in edit window
    const {
      //connectionNumber,
      tenantId,
      toggleSnackbar,
     // applicationNo,
      applicationNos,
      
      bill,
      state
    } = this.props;
  
     const submitButton = {
      label: "Submit",
      labelKey: "WF_EMPLOYEE_NEWWS1_SUBMIT_APPLICATION",
      link: async () => {     
     // console.log("submit clicked---");
      let combinedArray = get(state.screenConfiguration.preparedFinalObject, "WaterConnection");
      if (true) { moveToSuccess(combinedArray, store.dispatch) }
     /* if (isFormValid) {
        changeStep(state, dispatch);
      } else if (hasFieldToaster) {
        let errorMessage = {
          labelName: "Please fill all mandatory fields!",
          labelKey: "WS_FILL_REQUIRED_FIELDS"
        };
        store.dispatch(toggleSnackbar(true, errorMessage, "warning"));
      }*/
          /* store.dispatch(
            setRoute(
              `/wns/freezeConn?applicationNumber=${applicationNo}&connectionNumber=${connectionNumber}&tenantId=${tenantId}&service=${service}&action=edit&mode=FREEZE`
            )
          );*/
 
      },
    };

     const cancelButton = {
      label: "Cancel",
      labelKey: "WS_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL",
      link: async () => {     
      console.log("Cancel clicked---");
           store.dispatch(
            setRoute(
              `/wns/search`
            )
          );
 
      },
    };
    //if(applicationType === "MODIFY"){
    console.log("downloadMenu---"+downloadMenu)
    downloadMenu && downloadMenu.push(submitButton,cancelButton);
   
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
 
  /*if(connectDetailsData && connectDetailsData.BillingService && connectDetailsData.BillingService.BusinessService) 
  {const businessService = connectDetailsData.BillingService.BusinessService.map(
    (item) => {
      return item.businessService;
    }
  );}*/
  // console.log("businessService---"+businessService);
  return { state, applicationNo, applicationNos, bill };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbar: (open, message, variant) =>
      dispatch(toggleSnackbar(open, message, variant)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
