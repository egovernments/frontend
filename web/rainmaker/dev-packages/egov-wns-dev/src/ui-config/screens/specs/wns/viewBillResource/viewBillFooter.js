import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCommonApplyFooter } from "../../utils";
import { downloadBill } from "../../../../../ui-utils/commons";
import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

const connectionNo = getQueryArg(window.location.href, "connectionNumber");
const tenantId = getQueryArg(window.location.href, "tenantId");
const businessService = connectionNo.includes("WS") ? "WS" : "SW";

const callDownloadBill = ( mode) => {
  const val = [
    {
      key: 'consumerCode',
      value: getQueryArg(window.location.href, "connectionNumber")
    },
    { key: 'tenantId', value: tenantId },
    {
      key: "businessService", value: businessService
    }
  ]
  downloadBill(val, mode);
}


export const viewBillFooter = getCommonApplyFooter("BOTTOM",{
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
        labelKey: "WS_COMMON_DOWNLOAD_BILL"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        callDownloadBill( "download");
      }
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
      payButtonLabel: getLabel({
        labelKey: "WS_COMMON_PAY"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: `/egov-common/pay?consumerCode=${connectionNo}&tenantId=${tenantId}&businessService=${businessService}`
    }
  }
});