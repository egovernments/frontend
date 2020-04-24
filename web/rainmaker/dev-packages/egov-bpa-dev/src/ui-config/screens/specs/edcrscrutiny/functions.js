// import { httpRequest } from "../../../../../ui-utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
  toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import axios from "axios";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api.js";
import get from "lodash/get";
import set from "lodash/set";
import { validateFields, getLicenseDetails } from "../utils";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { getBpaSearchResults } from "../../../../ui-utils/commons";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { edcrHttpRequest } from "../../../../ui-utils/api";

const userTenant = getTenantId();
const userUUid = get(JSON.parse(getUserInfo()), "uuid");
export const fetchData = async (
  action,
  state,
  dispatch,
  fromMyApplicationPage = false
) => {
  dispatch(prepareFinalObject("searchResults", []));
  dispatch(prepareFinalObject("myApplicationsCount", 0));

  const mdmsRes = await getMdmsDataForOc(dispatch);
  let tenants =
    mdmsRes &&
    mdmsRes.MdmsRes &&
    mdmsRes.MdmsRes.tenant.citymodule.find(item => {
      if (item.code === "BPAAPPLY") return true;
    });
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.common-masters.citiesByModule.TL",
      tenants
    )
  );

  const response = await getSearchResultsfromEDCR(action, state, dispatch);
  try {
    if (response && response.edcrDetail) {
      dispatch(prepareFinalObject("searchResults", response.edcrDetail));
      dispatch(
        prepareFinalObject("myApplicationsCount", response.edcrDetail.length)
      );
      const myApplicationsCount = response.edcrDetail.length;
      if (fromMyApplicationPage) {
        dispatch(
          handleField(
            "my-applications",
            "components.div.children.header.children.key",
            "props.dynamicArray",
            myApplicationsCount ? [myApplicationsCount] : [0]
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const uuidv4 = () => {
  return require("uuid/v4")();
};

const moveToSuccess = (dispatch, edcrDetail, isOCApp) => {
  const applicationNo = edcrDetail.transactionNumber;

  const tenantId = edcrDetail.tenantId;
  const edcrNumber = get(edcrDetail, "edcrNumber"); 

  const purpose = isOCApp ? "ocapply" :"apply";
  let status = edcrDetail.status === "Accepted" ? "success" : "rejected";
  if(edcrDetail.status == "Aborted") {
    status = "aborted";
  }
  let url = `/edcrscrutiny/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&tenantId=${tenantId}`;
  if(isOCApp) {
    url = `/edcrscrutiny/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&tenantId=${tenantId}&edcrNumber=${edcrNumber}`;
  }
  dispatch(
    setRoute(
      url
    )
  );
};

const getSearchResultsfromEDCR = async (action, state, dispatch) => {
  try {
    let EDCRHost = "";

    const response = await axios.post(
      `${EDCRHost}/edcr/rest/dcr/scrutinydetails?tenantId=${getTenantId()}`,
      {
        RequestInfo: {
          apiId: "1",
          ver: "1",
          ts: "01-01-2017 01:01:01",
          action: "create",
          did: "jh",
          key: "",
          msgId: "gfcfc",
          correlationId: "wefiuweiuff897",
          authToken: "",
          userInfo: {
            id: userUUid,
            tenantId: userTenant
          }
        }
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSearchResultsfromEDCRWithApplcationNo = async (
  applicationNumber,
  tenantId
) => {
  try {
    let EDCRHost = "";
    const response = await axios.post(
      `${EDCRHost}/edcr/rest/dcr/scrutinydetails?tenantId=${tenantId}&transactionNumber=${applicationNumber}`,
      {
        RequestInfo: {
          apiId: "1",
          ver: "1",
          ts: "01-01-2017 01:01:01",
          action: "create",
          did: "jh",
          key: "",
          msgId: "gfcfc",
          correlationId: "wefiuweiuff897",
          authToken: "",
          userInfo: {
            id: userUUid,
            tenantId: userTenant
          }
        }
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const scrutinizePlan = async (state, dispatch) => {
  try {
    dispatch(toggleSpinner());

    let { screenConfiguration } = state;
    let { preparedFinalObject } = screenConfiguration;
    let isOCApp = window.location.href.includes("ocapply");
    let tenantId = get(preparedFinalObject, "Scrutiny[0].tenantId");

    let userInfo = { id: userUUid, tenantId: userTenant }, edcrNumber = "";

    if (isOCApp) { 
      tenantId = getQueryArg(window.location.href, "tenantId");
      userInfo = { id: userUUid, tenantId: tenantId },
      edcrNumber =  get(state.screenConfiguration.preparedFinalObject, "bpaDetails.edcrNumber");
     }
    else { userInfo = { id: userUUid, tenantId: userTenant } }

    let edcrRequest = {
      transactionNumber: "",
      edcrNumber: edcrNumber,
      planFile: null,
      tenantId: "",
      RequestInfo: {
        apiId: "",
        ver: "",
        ts: "",
        action: "",
        did: "",
        authToken: "",
        key: "",
        msgId: "",
        correlationId: "",
        userInfo: userInfo
      }
    };
    //generate trx no
    const transactionNumber = uuidv4();
    //
    const applicantName = get(preparedFinalObject, "Scrutiny[0].applicantName");
    const file = get(preparedFinalObject, "Scrutiny[0].buildingPlan[0]");
    const permitNumber = get(preparedFinalObject, "Scrutiny[0].permitNumber");
    const permitDate = get(preparedFinalObject, "bpaDetails.orderGeneratedDate");

    edcrRequest = { ...edcrRequest, tenantId };
    edcrRequest = { ...edcrRequest, transactionNumber };
    edcrRequest = { ...edcrRequest, applicantName };

    let url = `/edcr/rest/dcr/scrutinizeplan?tenantId=${tenantId}`;
    if(isOCApp) {
      url = `/edcr/rest/dcr/scrutinizeocplan?tenantId=${tenantId}`;
      edcrRequest = { ...edcrRequest, permitDate };
      edcrRequest = { ...edcrRequest, permitNumber };
    }

    var bodyFormData = new FormData();
    bodyFormData.append("edcrRequest", JSON.stringify(edcrRequest));
    bodyFormData.append("planFile", file);


    let response = await axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    });
    if (response) {
      let { data } = response;
      if (data.edcrDetail) {
        dispatch(prepareFinalObject("edcrDetail", data.edcrDetail));
        dispatch(toggleSpinner());
        moveToSuccess(dispatch, data.edcrDetail[0], isOCApp);
      }
    }
  } catch (e) {
    dispatch(toggleSnackbar(true, { labelName: e.message }, "error"));
    dispatch(toggleSpinner());
    console.log(e);
  }
};

export const resetFields = (state, dispatch) => {
  let filedata = get(
    state.screenConfiguration.preparedFinalObject,
    "Scrutiny[0].buildingPlan[0]"
  );

  if (typeof filedata === "object" && !Array.isArray(filedata)) {
    window.location.reload();
  } else {
    dispatch(
      handleField(
        "apply",
        "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.children.applicantName",
        "props.value",
        ""
      )
    );
    dispatch(
      handleField(
        "apply",
        "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.children.dropdown",
        "props.value",
        { name: "", code: "" }
      )
    );
  }
  dispatch(prepareFinalObject("Scrutiny[0].buildingPlan[0]", []));
  dispatch(prepareFinalObject("Scrutiny[0].tenantId", ""));
  dispatch(prepareFinalObject("LicensesTemp[0].uploadedDocsInRedux[0]", []));
};

export const validateForm = (state, dispatch) => {
  let isInputDataValid = validateFields(
    "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.children",
    state,
    dispatch
  );

  let filedata = get(
    state.screenConfiguration.preparedFinalObject,
    "Scrutiny[0].buildingPlan[0]"
  );
  let isDocValid = false;
  isDocValid =
    filedata && typeof filedata === "object" && !Array.isArray(filedata);

  return isDocValid && isInputDataValid;
};

export const submitFields = async (state, dispatch) => {
  if (validateForm(state, dispatch)) {
    let a = await scrutinizePlan(state, dispatch);
  } else {
    let errorMessage = {
      labelName: "Please fill all mandatory fields and upload the documents!",
      labelKey: "ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
    };
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  }
};

export const getMdmsData = async () => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: getTenantId(),
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

export const fetchMDMSData = async (action, state, dispatch) => {
  const mdmsRes = await getMdmsData(dispatch);
  let TenantList = [];
  if (mdmsRes && mdmsRes.MdmsRes && mdmsRes.MdmsRes.tenant) {
    mdmsRes.MdmsRes.tenant.citymodule.forEach(element => {
      if (element.code === "BPAREG") {
        element.tenants.forEach(tenant => {
          TenantList.push({ code: tenant.code, name: tenant.code });
        });
      }
    });
  }
  dispatch(prepareFinalObject("applyScreenMdmsData.tenantData", TenantList));
};

export const fetchMDMSOCData = async (action, state, dispatch) => {
  const mdmsRes = await getMdmsDataForOc(dispatch);
  if(mdmsRes && mdmsRes.MdmsRes) {
    dispatch(prepareFinalObject("applyScreenMdmsData", mdmsRes.MdmsRes));
  }
};

export const getMdmsDataForOc = async () => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: getTenantId(),
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [{ name: "citymodule" }]
        },
        {
          moduleName: "BPA",
          masterDetails: [{name: "ServiceType"}]
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

export const getBuildingDetails = async (state, dispatch, fieldInfo) => {
  let tenantId = getQueryArg(window.location.href, "tenantId");
  let permitNum = get(
    state.screenConfiguration.preparedFinalObject,
    `Scrutiny[0].permitNumber`,
    ""
  );
  let queryObject = [
    { key: "tenantId", value: tenantId },
    { key: "permitNos", value: permitNum }
  ];
  const response = await getBpaSearchResults(queryObject);
  let edcrRes = await edcrHttpRequest(
    "post",
    "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + get(response, "Bpa[0].edcrNumber") + "&tenantId=" + tenantId,
    "search", []
  );

  let primaryOwnerArray = response.Bpa[0].owners.filter(owr => owr && owr.isPrimaryOwner && owr.isPrimaryOwner == true );
  dispatch(prepareFinalObject(`Scrutiny[0].applicantName`, primaryOwnerArray.length && primaryOwnerArray[0].name));
  dispatch(prepareFinalObject(`bpaDetails`, get(response, "Bpa[0]")));
  dispatch(prepareFinalObject(`scrutinyDetails`, edcrRes.edcrDetail[0]));
  let SHLicenseDetails = await getLicenseDetails(state,dispatch);
  dispatch(prepareFinalObject(`bpaDetails.appliedBy`, SHLicenseDetails));
};