import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCommonApplyFooter } from "../../utils";
import { downloadBill } from "egov-common/ui-utils/commons"
import "./index.css";

const callDownloadBill = () => {
  const val = [
    //   {
    //   key: 'consumerCode',
    //   value: 'WS/107/2019-20/000022',
    // value:getQueryArg(window.location.href, "connectionNumber")
    // },
    // { key: "billIds", value: tableMeta.rowData[8] },

    // value:getQueryArg(window.location.href, "tanentId")
    { key: 'tenantId', value: 'pb.amritsar' }]
  downloadBill(val);
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