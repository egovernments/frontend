import { downloadBill } from "egov-common/ui-utils/commons";
import { Tooltip } from "egov-ui-framework/ui-molecules";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import { routeToCommonPay } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils";
import Label from "egov-ui-kit/utils/translationNode";
import get from "lodash/get";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TotalDuesButton } from "./components";
import "./index.css";
import RebateDialogue from '../RebateDialogue'
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest as httpRequestnew } from "egov-ui-framework/ui-utils/api";
import { hideSpinner, showSpinner } from "egov-ui-kit/redux/common/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

const labelStyle = {
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: 400,
  letterSpacing: "0.58px",
  lineHeight: "17px",
  textAlign: "left",
  paddingRight: "20px",
};

class TotalDues extends React.Component {
  state = {
    url: "",
    isDialog:false,
    isRebateApplicable:false,
    rebateForCurrYear : {}
  };

    getCurrentFinancialYear = () => {
    var today = new Date();
    var curMonth = today.getMonth();
    var fiscalYr = "";
    if (curMonth > 3) {
      var nextYr1 = (today.getFullYear() + 1).toString();
      fiscalYr = today.getFullYear().toString() + "-" + nextYr1.substr(2);
    } else {
      var nextYr2 = today.getFullYear().toString();
      fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.substr(2);
    }
    return fiscalYr;
  };

  componentDidMount = async () => {
    const { tenantId,prepareFinalObject } = this.props;
    const curentFinYear = this.getCurrentFinancialYear();
    console.log(curentFinYear);
    const requestBody = {
      MdmsCriteria: {
        tenantId: tenantId || this.props.match.params.tenantId,
        moduleDetails: [
          {
            moduleName: "PropertyTax",
            masterDetails: [
              {
                name: "Rebate",
              },
            ],
          },
        ],
      },
    };
    const payload = await httpRequestnew(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );

    let rebateData = get(
      payload,
      "MdmsRes.PropertyTax.Rebate",
      []
    );
    if (rebateData.length === 0) {
      this.setState({
        isRebateApplicable: false
      })
    }
    else {
      console.log("rebateData::" + JSON.stringify(rebateData))
      let rebateForCurrYear = rebateData && rebateData.filter(item => item.fromFY === curentFinYear)[0];
      if (!rebateForCurrYear)
        rebateForCurrYear = rebateData[rebateData.length - 1];
      console.log("rebateForCurrYear:::" + JSON.stringify(rebateForCurrYear))
      let startDate = rebateForCurrYear.endingDay;
      startDate = startDate + "/" + curentFinYear.split('-')[0];
      rebateForCurrYear.endDate = startDate;
      console.log("startDate::" + startDate)
      let parts = startDate.split('/');
      let currentDate = new Date();
      const rebateEndDate = new Date(parts[2], parts[1] - 1, parts[0]);
      console.log(rebateEndDate, "--rebateEndDate");
      console.log(currentDate, "--currentDate");
      

      if (currentDate <= rebateEndDate)
        this.setState({
          isRebateApplicable: true,
          rebateForCurrYear:rebateForCurrYear
        })
    }
  }


  onClickAction = async (consumerCode, tenantId) => {
    this.setState({
      url: await downloadBill(consumerCode, tenantId, "property-bill"),
    });
  };
  payAction = async (consumerCode, tenantId) => {
    const {isRebateApplicable} = this.state;
    const { showSpinner,hideSpinner } = this.props;
    if(isRebateApplicable){
    this.setState({
      isDialog: true
    })
  }
  else{
     showSpinner();
    const payload = await httpRequestnew(
      "post",
      `/pt-calculator-v2/propertytax/_updatedemand?tenantId=${tenantId}&consumerCodes=${consumerCode}&isFullPayment=false`,
      "",
      [],
      {}
      );
      hideSpinner();
    routeToCommonPay(consumerCode, tenantId);
  }
    // const status = get(this.props, 'propertyDetails[0].status', '');
    // if (status != "ACTIVE") {
    //   this.props.toggleSnackbarAndSetText(
    //     true,
    //     { labelName: "Property in Workflow", labelKey: "ERROR_PROPERTY_IN_WORKFLOW" },
    //     "error"
    //   );
    // } else {
    //   routeToCommonPay(consumerCode, tenantId);
    // }
  }

  redirectToPay= async (isFullPayment,selectedOption) => {
    // this.setState({
    //   isDialog: true
    // })
    const { showSpinner,hideSpinner } = this.props;
    if(selectedOption.length==0){
      this.props.toggleSnackbarAndSetText(
            true,
            { labelName: "Pls Select the option", labelKey: "Pls select option" },
            "error"
          );
    }else{
      prepareFinalObject("isFullPayment",isFullPayment);
  
    const { consumerCode, tenantId } = this.props;
    const status = get(this.props, 'propertyDetails[0].status', '');
    if (status != "ACTIVE") {
      this.props.toggleSnackbarAndSetText(
        true,
        { labelName: "Property in Workflow", labelKey: "ERROR_PROPERTY_IN_WORKFLOW" },
        "error"
      );
    } else {
      showSpinner();
      const payload = await httpRequestnew(
        "post",
        `/pt-calculator-v2/propertytax/_updatedemand?tenantId=${tenantId}&consumerCodes=${consumerCode}&isFullPayment=${isFullPayment}`,
        "",
        [],
        {}
        );
        hideSpinner();
      routeToCommonPay(consumerCode, tenantId);
    }
  }
  }

  closeRebateDialogue = () => {
    this.setState({ isDialog: false });
  };

  render() {
    const { totalBillAmountDue, consumerCode, tenantId, isAdvanceAllowed, history } = this.props;
    const {closeRebateDialogue,redirectToPay} = this;
    const {isDialog,rebateForCurrYear} = this.state;
    const envURL = "/egov-common/pay";
    const { payAction } = this;
    const data = { value: "PT_TOTALDUES_TOOLTIP", key: "PT_TOTALDUES_TOOLTIP" };
    return (
      <div className="" id="pt-header-due-amount">
        <div className="col-xs-6 col-sm-3 flex-child" style={{ minHeight: "60px" }}>
          <Label buttonLabel={false} label="PT_TOTAL_DUES" color="rgba(0, 0, 0, 0.74)" labelStyle={labelStyle} fontSize="14px" />
          <Label
            label="Rs "
            secondaryText={totalBillAmountDue ? totalBillAmountDue : 0}
            labelStyle={labelStyle}
            fontSize="24px"
            fontWeight="500"
            color="rgb(0, 0, 0, 0.87)"
            height="35px"
          ></Label>
        </div>
        <Tooltip
          className="totaldues-tooltip-icon"
          val={data}
          icon={"info_circle"}
          style={{ position: "absolute", left: "160px", top: "30px", display: "flex", paddingLeft: "18px" }}
        />
        <div className="col-xs-6 col-sm-3 flex-child" style={{ minHeight: "60px" }}>
        </div>
          <div className="col-xs-6 col-sm-3 flex-child-button">
            {/* <TotalDuesButton
              labelText="PT_TOTALDUES_VIEW"
              onClickAction={() => {
                this.onClickAction(consumerCode, tenantId);
                window.open(this.state.url);
              }}
            /> */}
          </div>
        {(totalBillAmountDue > 0 || (totalBillAmountDue === 0 && isAdvanceAllowed)) && (
          <div id="pt-flex-child-button" className="col-xs-12 col-sm-3 flex-child-button">
            <div style={{ float: "right" }}>
              <TotalDuesButton
                primary={true}
                labelText="PT_TOTALDUES_PAY"
                onClickAction={() => {
                  payAction(consumerCode, tenantId);
                }}
              />
            </div>
          </div>


        )}
        {isDialog && <RebateDialogue open={true} closeRebateDialogue = {closeRebateDialogue} redirectToPay={redirectToPay} rebateForCurrYear={rebateForCurrYear}/>}

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { propertiesById } = state.properties || {};
  const propertyId = ownProps.consumerCode;
  const selPropertyDetails = propertiesById[propertyId] || {};
  const propertyDetails = selPropertyDetails.propertyDetails || [];
  return {
    propertyDetails,
    propertyId
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
    prepareFinalObject: (jsonPath, value) =>
    dispatch(prepareFinalObject(jsonPath, value)),
    showSpinner: () => dispatch(showSpinner()),
    hideSpinner: () => dispatch(hideSpinner()),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TotalDues));