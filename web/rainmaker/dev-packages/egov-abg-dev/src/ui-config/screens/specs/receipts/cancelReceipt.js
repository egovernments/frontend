import commonConfig from "config/common.js";
import { getCommonContainer, getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import { cancelReceiptDetailsCard } from "./cancelReceiptResource/cancelReceiptDetails";
import { cancelReceiptFooter } from "./cancelReceiptResource/cancelReceiptFooter";
import { MDMS } from "egov-ui-kit/utils/endPoints";

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Cancel Receipt`,
    labelKey: "CR_COMMON_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-abg",
    componentPath: "ApplicationContainer",
    props: {
      number: getQueryArg(window.location.href, "receiptNumbers"),
      label: {
        labelValue: "Receipt Details Receipt No.",
        labelKey: "CR_RECEIPT_DETAILS_NUMBER"
      }
    },
    visible: true
  }
});
const getData = async (action, state, dispatch) => {

  let requestBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "CancelReceiptReason"
            }
          ]
        }
      ]
    }
  };

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      MDMS.GET.URL,
      "_search",
      [],
      requestBody
    );

    if (payload) {

      dispatch(prepareFinalObject('applyScreenMdmsData.reasonForReceiptCancel', get(payload, 'MdmsRes.common-masters.CancelReceiptReason', [{code:"ERROR_RECEIPT"},{code:"CHEQUE_BOUNCE"},{code:"OTHER"}])));
    }

  } catch (e) {
    console.log(e);
  }


  // return action;
};

const cancelReceipt = {
  uiFramework: "material-ui",
  name: "cancelReceipt",
  beforeInitScreen: (action, state, dispatch) => {
    getData(action, state, dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "cancelReceipt"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            }
          }
        },
        cancelReceiptDetailsCard,
        cancelReceiptFooter
      }
    }
  }
};

export default cancelReceipt;
