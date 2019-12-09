import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCommonApplyFooter } from "../../utils";
import { download } from "egov-common/ui-utils/commons";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import "./index.css";

const callDownloadBill = () => {
  const val = [
    {
      key: 'consumerCode',
      // value: 'WS/107/2019-20/000018',
      value: getQueryArg(window.location.href, "connectionNumber")
    },
    // { key: "billIds", value: '9d9293bc-da3f-474f-a392-b71242791471' },

    { key: 'tenantId', value: getQueryArg(window.location.href, "tenantId") }]
  download(val);
}

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
        labelKey: "WS_COMMON_DOWNLOAD_BILL"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callDownloadBill
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
      action: "condition",
      // callBack: callBackForPrevious
    },
    // visible: false
  },
});