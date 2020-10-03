import commonConfig from "config/common.js";
import {
  getCommonHeader,
  getCommonContainer,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { newCollectionFooter } from "./newCollectionResource/newCollectionFooter";
import { newCollectionConsumerDetailsCard } from "./newCollectionResource/neCollectionConsumerDetails";
import { newCollectionServiceDetailsCard } from "./newCollectionResource/newCollectionServiceDetails";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import "./index.css";

const header = getCommonHeader({
  labelName: "New Challan",
  labelKey: "UC_COMMON_HEADER",
});
const tenantId = getTenantId();

const getData = async (action, state, dispatch) => {
  console.info("getData");
  let requestBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants",
            },
            { name: "citymodule" },
          ],
        },
        {
          moduleName: "common-masters",
          masterDetails: [{ name: "Help" }],
        },
        {
          moduleName: "BillingService",
          masterDetails: [
            {
              name: "BusinessService",
              filter: "[?(@.type=='Adhoc')]",
            },
            {
              name: "TaxHeadMaster",
            },
            {
              name: "TaxPeriod",
            },
          ],
        },
      ],
    },
  };

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );

    if (payload) {
      dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
      const citymodule = get(payload, "MdmsRes.tenant.citymodule");
      const liveTenants =
        citymodule && citymodule.filter((item) => item.code === "UC");
      console.log("Live tenants", liveTenants);
      console.log("citymodule", citymodule);
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.tenant.citiesByModule",
          get(liveTenants[0], "tenants")
        )
      );
    }

    let helpUrl = get(payload, "MdmsRes.common-masters.Help", []).filter(
      (item) => item.code === "UC"
    );

    dispatch(prepareFinalObject("helpFileUrl", helpUrl[0].URL));

    try {
      let payload = await httpRequest(
        "post",
        "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
        "_search",
        [{ key: "tenantId", value: `${tenantId}` }],
        {}
      );
      const mohallaData =
        payload &&
        payload.TenantBoundary[0] &&
        payload.TenantBoundary[0].boundary &&
        payload.TenantBoundary[0].boundary.reduce((result, item) => {
          result.push({
            ...item,
            name: `${tenantId
              .toUpperCase()
              .replace(/[.]/g, "_")}_REVENUE_${item.code
              .toUpperCase()
              .replace(/[._:-\s\/]/g, "_")}`,
          });
          return result;
        }, []);
      dispatch(
        prepareFinalObject("applyScreenMdmsData.tenant.localities", mohallaData)
      );

      dispatch(
        handleField(
          "newCollection",
          "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children.ConsumerLocMohalla",
          "props.suggestions",
          mohallaData
          // payload.TenantBoundary && payload.TenantBoundary[0].boundary
        )
      );
      const mohallaLocalePrefix = {
        moduleName: `${tenantId}`,
        masterName: "REVENUE",
      };

      dispatch(
        handleField(
          "newCollection",
          "components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children.ConsumerLocMohalla",
          "props.localePrefix",
          mohallaLocalePrefix
        )
      );
      let challanNo = getQueryArg(window.location.href, "consumerCode");
      if (challanNo == null) {
        dispatch(
          handleField(
            "newCollection",
            "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.City",
            "props.value",
            getTenantId()
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
    //End of Mohalla data
  } catch (e) {
    console.error("Unable to fetch detail", e);
  }
};
//for up data challan
const getChallanSearchRes = async (action, state, dispatch) => {
  try {
    let challanNo = getQueryArg(window.location.href, "consumerCode");
    let tenantId = getQueryArg(window.location.href, "tenantId");
    let businessService = getQueryArg(window.location.href, "businessService");

    const searchpayload = await httpRequest(
      "post",
      `/echallan-services/eChallan/v1/_search?challanNo=${challanNo}&tenantId=${tenantId}&businessService=${businessService}`,
      "_search",
      [],
      {}
    );
    if (
      searchpayload &&
      searchpayload.challans &&
      searchpayload.challans[0].applicationStatus === "ACTIVE"
    ) {
      const fetchbillPayload = await httpRequest(
        "post",
        `/billing-service/bill/v2/_fetchbill?consumerCode=${challanNo}&businessService=${businessService}&tenantId=${tenantId}`,
        "",
        [],
        {}
      );
      let amounts = [];

      //Set the bill detail
      fetchbillPayload &&
        dispatch(
          prepareFinalObject(
            "ChallanTaxHeads",
            get(
              fetchbillPayload,
              "Bill[0].billDetails[0].billAccountDetails",
              []
            )
          )
        );
      let bService = searchpayload.challans[0].businessService;
      searchpayload.challans[0].serviceType = bService;
      searchpayload.challans[0].businessService = bService.split(".")[0];
      searchpayload.challans[0].amount = [];

      dispatch(prepareFinalObject("Challan", searchpayload.challans));
      dispatch(
        handleField(
          "newCollection",
          "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.City",
          "props.value",
          tenantId
        )
      );
    } else {
      alert("INVALID CHALLAN DETAIL");
    }
  } catch (e) {
    console.error("Unable to fetch detail", e);
  }
};

const newCollection = {
  uiFramework: "material-ui",
  name: "newCollection",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("Challan", []));
    getData(action, state, dispatch);
    if (getQueryArg(window.location.href, "consumerCode") != null) {
      getChallanSearchRes(action, state, dispatch);
    }

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "newCollection",
      },
      children: {
        header: getCommonContainer({
          header: getCommonHeader({
            labelName: "New Challan",
            labelKey: "UC_COMMON_HEADER",
          }),
        }),
        buttonDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            className: "searchreceipt-commonButton",
            style: { textAlign: "right", display: "flex" },
          },
          children: {
            searchAndPayBtn: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                color: "primary",
                style: {
                  color: "primary",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px",
                  marginRight: "16px",
                },
                className: "uc-searchAndPayBtn-button",
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Search And Pay",
                  labelKey: "UC_SEARCHANDPAY_LABEL",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  openPayBillForm(state, dispatch);
                },
              },
            },
            searchReceiptBtn: {
              componentPath: "Button",
              //visible: enableButton,
              props: {
                variant: "outlined",
                color: "primary",
                style: {
                  color: "primary",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px",
                  marginRight: "16px",
                },
                className: "uc-search-button",
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Receipt Search",
                  labelKey: "UC_SEARCHRECEIPT_LABEL",
                }),
              },

              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  openReceiptSearchForm(state, dispatch);
                },
              },
            },
            EditBtn: {
              componentPath: "Button",
              //visible: enableButton,
              props: {
                variant: "outlined",
                color: "primary",
                style: {
                  color: "primary",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px",
                  marginRight: "16px",
                },
                className: "uc-edit-button",
              },
              children: {
                buttonLabel: getLabel({
                  labelName: "Edit",
                  labelKey: "UC_EDIT_LABEL",
                }),
              },

              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  openUpdateForm(state, dispatch);
                },
              },
            },
          },
        },

        newCollectionConsumerDetailsCard,
        newCollectionServiceDetailsCard,
        newCollectionFooter,
      },
    },
  },
};

export default newCollection;

//for update rediredt

const openUpdateForm = (state, dispatch) => {
  window.location.href = `/uc/newCollection?consumerCode=CH-CB-AGRA-2020-001384&tenantId=${tenantId}&businessService=ENTFEE.PARK`;
};
const openReceiptSearchForm = (state, dispatch) => {
  // dispatch(prepareFinalObject("Demands", []));
  dispatch(prepareFinalObject("Challan", []));
  dispatch(prepareFinalObject("ReceiptTemp[0].Bill", []));
  const path =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/uc/search`
      : `/uc/search`;
  dispatch(setRoute(path));
};

const openPayBillForm = (state, dispatch) => {
  const path = `/abg/billSearch`;
  dispatch(setRoute(path));
};
