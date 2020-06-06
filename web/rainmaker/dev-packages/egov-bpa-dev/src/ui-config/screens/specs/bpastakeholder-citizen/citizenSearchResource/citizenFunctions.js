import { getSearchResults,getBpaSearchResults } from "../../../../../ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import commonConfig from "config/common.js";
import get from "lodash/get";
import { getWorkFlowData,getWorkFlowDataForBPA } from "../../bpastakeholder/searchResource/functions";
import { getTextToLocalMapping, convertEpochToDate, getBpaTextToLocalMapping} from "../../utils/index";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import { changePage } from "../my-applications-stakeholder";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

export const getMdmsData = async () => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [{ name: "citymodule" }]
        },
        {
          moduleName: "BPA",
          masterDetails: [{ name: "ServiceType" }]
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
export const fetchData = async (
  action,
  state,
  dispatch,
  fromMyApplicationPage = false,
  fromStakeHolderPage = false
) => {
  let userInfo = JSON.parse(getUserInfo());
  let uuid = get(userInfo, "uuid");
  const queryObj = [
    {
      key: "requestor",
      value: uuid
    }
  ];
  const response = await getSearchResults();
  const bpaResponse = await getBpaSearchResults(queryObj);
  const mdmsRes = await getMdmsData(dispatch);
  let tenants =
    mdmsRes &&
    mdmsRes.MdmsRes &&
    mdmsRes.MdmsRes.tenant.citymodule.find(item => {
      if (item.code === "BPAAPPLY") return true;
    });
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData", mdmsRes.MdmsRes
    )
  );
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.common-masters.citiesByModule.TL",
      tenants
    )
  );
  try {
    if(window.location.href.includes("bpastakeholder-citizen/home")) {
      let myApplicationsCount = 0;
      if(response && response.Licenses) {
        myApplicationsCount += response.Licenses.length
      }
      if(bpaResponse && bpaResponse.Bpa) {
        myApplicationsCount += bpaResponse.Bpa.length
      }
      dispatch(
        handleField(
          "my-applications",
          "components.div.children.header.children.key",
          "props.dynamicArray",
          myApplicationsCount ? [myApplicationsCount] : [0]
        )
      );
    } else {
      var searchConvertedArray = [];
      var sortConvertedArray = [];
      if (response && response.Licenses && response.Licenses.length > 0) {
        const businessIdToOwnerMapping = await getWorkFlowData(response.Licenses);

        response.Licenses.forEach(element => {
          let service = getTextToLocalMapping(
            "MODULE_" + get(element, "businessService")
          );

          let status = getTextToLocalMapping(
            "WF_ARCHITECT_" + get(element, "status")
          );
          let modifiedTime = element.auditDetails.lastModifiedTime;
          let licensetypeFull =
            element.tradeLicenseDetail.tradeUnits[0].tradeType;
          if (licensetypeFull.split(".").length > 1) {
            service +=
              " - " +
              getTextToLocalMapping(
                `TRADELICENSE_TRADETYPE_${getTransformedLocale(
                  licensetypeFull.split(".")[0]
                )}`
              );
          }
          if(!fromStakeHolderPage) {
            searchConvertedArray.push({
              applicationNumber: get(element, "applicationNumber", null),
              ownername: get(element, "tradeLicenseDetail.owners[0].name", null),
              businessService: service,
              serviceType: "BPAREG",
              assignedTo: get(
                businessIdToOwnerMapping[element.applicationNumber],
                "assignee",
                null
              ),
              status,
              sla: get(
                businessIdToOwnerMapping[element.applicationNumber],
                "sla",
                null
              ),
              tenantId: get(element, "tenantId", null),
              modifiedTime: modifiedTime,
              sortNumber: 0
            });
          } else {
            searchConvertedArray.push({
              [getBpaTextToLocalMapping("Application No")]: element.applicationNumber || "-",
              [getBpaTextToLocalMapping("BPA_COL_APP_STATUS")]: status || "-",
              applicationType: getBpaTextToLocalMapping("BPAREG_SERVICE"),
              [getBpaTextToLocalMapping("BPA_COL_MODULE_SERVICE")]: "Registration \n Stakeholder Registration",
              [getBpaTextToLocalMapping("BPA_COMMON_SLA")]: get(
                businessIdToOwnerMapping[element.applicationNumber],
                "sla",
                null
              ) || "-",
              [getBpaTextToLocalMapping("BPA_COL_ASSIGNEDTO")]: get(
                businessIdToOwnerMapping[element.applicationNumber],
                "assignee",
                null
              ) || "-",
              modifiedTime: modifiedTime,
              sortNumber: 1,
              serviceType: "BPAREG",
              tenantId: get(element, "tenantId", null)
            })
          }
        });
      }
      
      if(bpaResponse && bpaResponse.Bpa && bpaResponse.Bpa.length > 0){
        const businessIdToOwnerMappingForBPA = await getWorkFlowDataForBPA(bpaResponse.Bpa);
        bpaResponse.Bpa.forEach(element => {
          let status = getTextToLocalMapping(
            "WF_BPA_" + get(element, "status")
          );
          let bService = get(element, "businessService");
          let appType = "BUILDING_PLAN_SCRUTINY";
          let serType = "NEW_CONSTRUCTION";
          let type;
          if(bService === "BPA_OC") {
            appType = "BUILDING_OC_PLAN_SCRUTINY"
          }
          if(bService === "BPA_LOW") {
            type = "LOW"
          } else {
            type = "HIGH"
          }
          let service = getTextToLocalMapping(
            "BPA_APPLICATIONTYPE_" + appType
          );
          service += " - "+getTextToLocalMapping(
            "BPA_SERVICETYPE_" + serType
          );
          let modifiedTime = element.auditDetails.lastModifiedTime;
          let primaryowner = "-";
          let owners = get(element, "landInfo.owners", [])
          owners.map(item=>{
            if(item.isPrimaryOwner)
            {
              primaryowner = item.name;
            }
          });
          if(!fromStakeHolderPage){
            searchConvertedArray.push({
              applicationNumber: get(element, "applicationNo", null),
              ownername: primaryowner,
              businessService: service,
              assignedTo: get(
                businessIdToOwnerMappingForBPA[element.applicationNo],
                "assignee",
                null
              ),
              status,
              sla: get(
                businessIdToOwnerMappingForBPA[element.applicationNo],
                "sla",
                null
              ),
              tenantId: get(element, "tenantId", null),
              modifiedTime: modifiedTime,
              sortNumber: 1,
              type: type,
              serviceType: get(element, "businessService", null)
            })
          } else {
            searchConvertedArray.push({
              [getBpaTextToLocalMapping("Application No")]: element.applicationNo || "-",
              [getBpaTextToLocalMapping("BPA_COL_APP_STATUS")]: status || "-",
              applicationType: getBpaTextToLocalMapping("BPA_APPLY_SERVICE"),
              [getBpaTextToLocalMapping("BPA_COL_MODULE_SERVICE")] : "BPA \n Building permit new construction",
              [getBpaTextToLocalMapping("BPA_COMMON_SLA")]: get(
                businessIdToOwnerMappingForBPA[element.applicationNo],
                "sla",
                null
              ) || "-",
              [getBpaTextToLocalMapping("BPA_COL_ASSIGNEDTO")]: get(
                businessIdToOwnerMappingForBPA[element.applicationNo],
                "assignee",
                null
              ) || "-",
              modifiedTime: modifiedTime,
              sortNumber: 1,
              serviceType : element.serviceType,
              tenantId: get(element, "tenantId", null),
              type: element.riskType
            })
          }
        });
      }

      sortConvertedArray = [].slice.call(searchConvertedArray).sort(function(a,b){ 
        return new Date(b.modifiedTime) - new Date(a.modifiedTime) || a.sortNumber - b.sortNumber;
      });

      dispatch(prepareFinalObject("searchResults", sortConvertedArray));
      storeData(sortConvertedArray, dispatch, fromMyApplicationPage, fromStakeHolderPage); 
    }   
    } catch (error) {
      console.log(error);
    }
};

const storeData = (data, dispatch, fromMyApplicationPage, fromStakeHolderPage) => {
  dispatch(
    prepareFinalObject("myApplicationsCount", data.length)
  );
  const myApplicationsCount = data.length;

  if (fromStakeHolderPage) {
    dispatch(
      handleField(
        "my-applications-stakeholder",
        "components.div.children.applicationsCard",
        "props.data",
        data
      ));
    dispatch(
      handleField(
        "my-applications-stakeholder",
        "components.div.children.header.children.key",
        "props.dynamicArray",
        myApplicationsCount ? [myApplicationsCount] : [0]
      )
    );
  } else if(fromMyApplicationPage){

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

export const fieldChange = async (action, state, dispatch) => {
  const { screenConfiguration } = state;
  var value = action.value;
  let bService = "BPA";
  if (action.value === "BUILDING_PLAN_SCRUTINY" || action.value === "BUILDING_OC_PLAN_SCRUTINY" || action.value === "BPAREG_SERVICE") {
    if (action.value === "BUILDING_PLAN_SCRUTINY") {
      bService = "BPA_OC";
    } else if (action.value === "BUILDING_OC_PLAN_SCRUTINY") {
      bService = "BPA"
    } else if (action.value === "BPAREG_SERVICE") {
      bService = "ARCHITECT"
    }
    let businessServiceData = get(
      screenConfiguration.preparedFinalObject,
      `${bService}`,
      []
    );

    const states = get(businessServiceData, "states");
    if (states && states.length > 0) {
      const status = states.map((item, index) => {
        return {
          code: item.state
        };
      });
      dispatch(prepareFinalObject( "filterData[0].status"));
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.searchScreen.status",
          status.filter(item => item.code != null)
        )
      );
    }
  }

  if (value) {
    var filterName = action.componentJsonpath.slice(action.componentJsonpath.lastIndexOf(".") + 1, action.componentJsonpath.length);

    if ((filterName === "applicationType" && value === "BUILDING_PLAN_SCRUTINY") || 
       filterName === "applicationType" && value === "BUILDING_OC_PLAN_SCRUTINY") {
      dispatch(
        handleField(
          "my-applications-stakeholder",
          "components.div.children.filterCard.children.serviceType",
          "props.disabled",
          false
        )
      );
    }
    if (filterName === "applicationType" && value === "BPAREG_SERVICE") {
      dispatch(
        handleField(
          "my-applications-stakeholder",
          "components.div.children.filterCard.children.serviceType",
          "props.value",
          ""
        )
      );
      dispatch(
        handleField(
          "my-applications-stakeholder",
          "components.div.children.filterCard.children.serviceType",
          "props.disabled",
          true
        )
      );
    }
    let filterData = get(
      screenConfiguration.preparedFinalObject,
      "filterData",
      []
    );
    let bpaDetails = get(
      screenConfiguration.preparedFinalObject,
      "searchResults", []
    );
    for (const dataFilter in filterData[0]) {
      var filterValue = filterData[0][`${dataFilter}`]
      if (filterValue)
        bpaDetails = bpaDetails && bpaDetails.filter(details => details[`${dataFilter}`] === filterValue);
    }
    let tableState = {};
    changePage(tableState, bpaDetails);
  }
};

export const clearFilter = (state, dispatch, action) => {
  const { screenConfiguration } = state;

  let bpaDetails = get(
    screenConfiguration.preparedFinalObject,
    "searchResults",
    {}
  );

  storeData(bpaDetails, dispatch, false, true);
  dispatch(
    prepareFinalObject("filterData", [])
  );

  dispatch(
    handleField(
      "my-applications-stakeholder",
      "components.div.children.filterCard.children.applicationType",
      "props.value",
      "BUILDING_PLAN_SCRUTINY"
    )
  );
  dispatch(
    handleField(
      "my-applications-stakeholder",
      "components.div.children.filterCard.children.serviceType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "my-applications-stakeholder",
      "components.div.children.filterCard.children.applicationStatus",
      "props.value",
      ""
    )
  );
  dispatch(
    prepareFinalObject("filterData", [])
  );
};
