import {
  getCommonHeader,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  applicationSuccessFooter,
  paymentSuccessFooter,
  gotoHomeFooter,
  approvalSuccessFooter,
  paymentFailureFooter
} from "./acknowledgementResource/footers";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getSearchResults } from "../../../../ui-utils/commons";
import generatePdf from "../utils/receiptPdf";
import { Icon } from "egov-ui-framework/ui-atoms";
import set from "lodash/set";
import get from "lodash/get";
import { loadPdfGenerationData } from "../utils/receiptTransformer";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import getAcknowledgementCard from "egov-ui-framework/ui-containers/acknowledgementResource/acknowledgementUtils"
import "./index.css";

const downloadprintMenuConfig = (state, dispatch, purpose) => {
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: () => {
      generatePdf(state, dispatch, "application_download");
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: () => {
      generatePdf(state, dispatch, "application_print");
    },
    leftIcon: "assignment"
  };
  let certificateDownloadObject = {
    label: { labelName: "Certificate", labelKey: "NOC_CERTIFICATE" },
    link: () => {
      generatePdf(state, dispatch, "certificate_download");
    },
    leftIcon: "assignment"
  };
  let certificatePrintObject = {
    label: { labelName: "Certificate", labelKey: "NOC_CERTIFICATE" },
    link: () => {
      generatePdf(state, dispatch, "certificate_print");
    },
    leftIcon: "assignment"
  };
  let downloadMenu = [];
  let printMenu = [];
  switch (purpose) {
    case "apply":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "approve":
      downloadMenu = [certificateDownloadObject];
      printMenu = [certificatePrintObject];
      break;
    default:
      break;

  }

  return { downloadMenu, printMenu }

}


const setApplicationData = async (dispatch, applicationNumber, tenant) => {
  const queryObject = [
    {
      key: "tenantId",
      value: tenant
    },
    {
      key: "applicationNumber",
      value: applicationNumber
    }
  ];
  const response = await getSearchResults(queryObject);
  dispatch(prepareFinalObject("FireNOCs", get(response, "FireNOCs", [])));
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: (action, state, dispatch) => {
    const purpose = getQueryArg(window.location.href, "purpose");
    const status = getQueryArg(window.location.href, "status");
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const secondNumber = getQueryArg(window.location.href, "secondNumber");
    const tenant = getQueryArg(window.location.href, "tenantId");
    const{downloadMenu, printMenu}=downloadprintMenuConfig(state, dispatch, purpose);
    const config={
      state,
      dispatch,
      purpose,
      status,
      applicationNumber,
      secondNumber,
      tenant,
      loadPdfGenerationData,
      moduleName:"Fire Noc",
      downloadMenu,
      printMenu,
      applicationSuccessFooter,
      paymentSuccessFooter,
      gotoHomeFooter,
      approvalSuccessFooter,
      paymentFailureFooter
    }
    const data = getAcknowledgementCard(config);
    setApplicationData(dispatch, applicationNumber, tenant);
    set(action, "screenConfig.components.div.children", data);
    return action;
  }
};

export default screenConfig;
