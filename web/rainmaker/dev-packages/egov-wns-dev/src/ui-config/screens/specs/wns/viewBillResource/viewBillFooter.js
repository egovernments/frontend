import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCommonApplyFooter } from "../../utils";
import "./index.css";
import get from "lodash/get";

const applicationNo = "WS/107/2019-20/000022";
const tenantId = "pb.amritsar";
// const financialYear = get(LicenseData, "financialYear");
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
      payButtonLabel: getLabel({
        labelKey: "WS_COMMON_PAY"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: `/egov-common/pay?consumerCode=${applicationNo}&tenantId=${tenantId}&businessService=WS`
    }
  }
});