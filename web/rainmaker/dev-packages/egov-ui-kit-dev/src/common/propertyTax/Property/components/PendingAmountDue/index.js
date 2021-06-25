import { Button, Dialog } from "components";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons.js";
import { routeToCommonPay } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils";
import Label from "egov-ui-kit/utils/translationNode";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./index.css";

const bodyStyle = {
  backgroundColor: "#FFFFFF",
  border: "0.5px solid rgba(0, 0, 0, 0)",
  boxShadow: "0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22)",
  height: "240px !important"
}

const contentStyle = {
  width: "100%",
  maxWidth: "fit-content"
}

const buttonStyle = {
  backgroundColor: "none",
  boxShadow: "none",
  height: "auto",
  lineHeight: "0px"
}

const payNowButton = {
  display: "flex",
  justifyContent: "space-between"
}

const labelStyle = {
  color: "rgba(0, 0, 0, 1)",
  fontSize: "18px",
  fontWeight: "bold"
}
class PendingAmountDialog extends Component {

  navigateToCommonPay = (consumerCode, businessService) => {
    this.props.closeDialogue();
    routeToCommonPay(consumerCode, this.props.tenantId, businessService);
    // this.props.history.push(`${envURL}?consumerCode=${this.props.consumerCode}&tenantId=${this.props.tenantId}`);
  }

  dialogContent = (amount) => {
    return getLocaleLabels("PT_YOU_HAVE", "PT_YOU_HAVE") + " " + getLocaleLabels("PT_MUTATION_RS", "PT_MUTATION_RS") + "<b>" + amount + "</b>" + " " + getLocaleLabels("PT_PENDING_AMOUNT", "PT_PENDING_AMOUNT") + "<br/>" + getLocaleLabels("PT_INORDER_TO_TRANSFER", "PT_INORDER_TO_TRANSFER");
  }

  render() {
    const { open, closeDialogue, amount, totalDues, waterDetails, sewerDetails, consumerCode } = this.props;
    const envURL = "/egov-common/pay";
    const waterDue = totalDues && totalDues.waterDue ? totalDues.waterDue : 0;
    const sewerDue = totalDues && totalDues.sewerDue ? totalDues.sewerDue : 0;
    return (
      <Dialog
        open={open}
        children={[
          <div style={{ margin: 16 }}>
            <Label label="PT_PENDING_AMOUNT_DUE" style={labelStyle} labelClassName="pending-amount-due" />
            <br />
            <p className="dialog-content">
              <Label fontSize="18px" label="PT_INORDER_TO_TRANSFER" />
            </p>
            <div>
              <Label fontSize="18px" label="PT_PROPERTY_DUE" />
              <div style={payNowButton} >
              <div style={labelStyle}>Rs {amount}</div>
              <Button disabled={amount <= 0} className="pending-dues" style={buttonStyle} label={<Label buttonLabel={true} color= "rgb(254, 122, 81)"  label="CS_COMMON_PAY_NOW" fontSize="16px" />} onClick={() => { this.navigateToCommonPay(consumerCode, "PT") }}/>
              </div>
            </div><br/>
            <div>
              <Label fontSize="18px" label="PT_WATER_BILL_DUE" />
              <div style={payNowButton} >
              <div style={labelStyle}>Rs {waterDue}</div>
              <Button disabled={waterDue <= 0} className="pending-dues" style={buttonStyle} label={<Label buttonLabel={true} color= "rgb(254, 122, 81)"  label="CS_COMMON_PAY_NOW" fontSize="16px" />} onClick={() => { this.navigateToCommonPay(waterDetails && waterDetails.connectionNo, "WS") }}/>
              </div>
            </div><br/>
            <div>
              <Label fontSize="18px" label="PT_SEWERAGE_BILL_DUE" />
              <div style={payNowButton} >
              <div style={labelStyle}>Rs {sewerDue}</div>
              <Button disabled={sewerDue <= 0} className="pending-dues" style={buttonStyle}  label={<Label buttonLabel={true} color= "rgb(254, 122, 81)"  label="CS_COMMON_PAY_NOW" fontSize="16px" />} onClick={() => { this.navigateToCommonPay(sewerDetails &&sewerDetails.connectionNo, "SW") }}/>
              </div>
            </div>
          </div>
        ]}
        bodyStyle={bodyStyle}
        isClose={true}
        handleClose={closeDialogue}
        onRequestClose={closeDialogue}
        contentStyle={contentStyle}
        contentClassName="amount-due-dialog-content"
      />
    );
  }

};

export default withRouter(PendingAmountDialog);
