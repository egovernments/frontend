import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCommonApplyFooter } from "../../utils";
import "./index.css";
export const viewBillFooter = getCommonApplyFooter({
  downloadButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadButton: getLabel({
        labelName: "DOWNLOAD BILL",
        labelKey: "DOWNLOAD BILL"
      })
    },
    onClickDefination: {
      action: "condition",
      // callBack: callBackForPrevious
    },
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonLabel: getLabel({
        labelName: "PAY",
        labelKey: "PAY"
      })
    },
    onClickDefination: {
      action: "condition",
      // callBack: callBackForPrevious
    },
    // visible: false
  },
});