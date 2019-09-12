import get from "lodash/get";
import { getSearchResults } from "../../../../../ui-utils/commons";
import { convertEpochToDate } from "../../utils/index";
import { httpRequest } from "../../../../../ui-utils";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels
} from "egov-ui-framework/ui-utils/commons";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import commonConfig from "config/common.js";

const getMdmsData = async () => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [{ name: "citymodule" }]
        }
      ]
    }
  };
  try {
    let payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    return payload;
  } catch (e) {
    console.log(e);
  }
};
export const fetchData = async (action, state, dispatch) => {
  const response = await getSearchResults();
  const mdmsRes = await getMdmsData(dispatch);
  let tenants =
    mdmsRes &&
    mdmsRes.MdmsRes &&
    mdmsRes.MdmsRes.tenant.citymodule.find(item => {
      if (item.code === "TL") return true;
    });
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.common-masters.citiesByModule.TL",
      tenants
    )
  );
  try {
    let data =
      response &&
      response.Licenses.map(item => ({
        [get(textToLocalMapping, "Application No")]:
          item.applicationNumber || "-",
        [get(textToLocalMapping, "License No")]: item.licenseNumber || "-",
        [get(textToLocalMapping, "Trade Name")]: item.tradeName || "-",
        [get(textToLocalMapping, "Owner Name")]:
          item.tradeLicenseDetail.owners[0].name || "-",
        [get(textToLocalMapping, "Application Date")]:
          convertEpochToDate(item.applicationDate) || "-",
        tenantId: item.tenantId,
        [get(textToLocalMapping, "Status")]:
          get(textToLocalMapping, item.status) || "-"
      }));
    dispatch(
      handleField(
        "home",
        "components.div.children.applyCard.children.searchResults",
        "props.data",
        data
      )
    );
  } catch (error) {
    console.log(error);
  }
};

export const textToLocalMapping = {
  "Application No": getLocaleLabels(
    "Application No",
    "TL_COMMON_TABLE_COL_APP_NO",
    getTransformedLocalStorgaeLabels()
  ),

  "License No": getLocaleLabels(
    "License No",
    "TL_COMMON_TABLE_COL_LIC_NO",
    getTransformedLocalStorgaeLabels()
  ),

  "Trade Name": getLocaleLabels(
    "Trade Name",
    "TL_COMMON_TABLE_COL_TRD_NAME",
    getTransformedLocalStorgaeLabels()
  ),
  "Owner Name": getLocaleLabels(
    "Owner Name",
    "TL_COMMON_TABLE_COL_OWN_NAME",
    getTransformedLocalStorgaeLabels()
  ),

  "Application Date": getLocaleLabels(
    "Application Date",
    "TL_COMMON_TABLE_COL_APP_DATE",
    getTransformedLocalStorgaeLabels()
  ),

  Status: getLocaleLabels(
    "Status",
    "TL_COMMON_TABLE_COL_STATUS",
    getTransformedLocalStorgaeLabels()
  ),

  INITIATED: getLocaleLabels(
    "Initiated,",
    "TL_INITIATED",
    getTransformedLocalStorgaeLabels()
  ),
  APPLIED: getLocaleLabels(
    "Applied",
    "TL_APPLIED",
    getTransformedLocalStorgaeLabels()
  ),
  PAID: getLocaleLabels(
    "Paid",
    "WF_NEWTL_PENDINGAPPROVAL",
    getTransformedLocalStorgaeLabels()
  ),

  APPROVED: getLocaleLabels(
    "Approved",
    "TL_APPROVED",
    getTransformedLocalStorgaeLabels()
  ),
  REJECTED: getLocaleLabels(
    "Rejected",
    "TL_REJECTED",
    getTransformedLocalStorgaeLabels()
  ),
  CANCELLED: getLocaleLabels(
    "Cancelled",
    "TL_CANCELLED",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGAPPROVAL: getLocaleLabels(
    "Pending for Approval",
    "WF_NEWTL_PENDINGAPPROVAL",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGPAYMENT: getLocaleLabels(
    "Pending payment",
    "WF_NEWTL_PENDINGPAYMENT",
    getTransformedLocalStorgaeLabels()
  ),

  FIELDINSPECTION: getLocaleLabels(
    "Pending for Field Inspection",
    "WF_NEWTL_FIELDINSPECTION",
    getTransformedLocalStorgaeLabels()
  ),

  MY_APPLICATIONS: getLocaleLabels(
    "My Applications",
    "TL_MY_APPLICATIONS",
    getTransformedLocalStorgaeLabels()
  )
};
