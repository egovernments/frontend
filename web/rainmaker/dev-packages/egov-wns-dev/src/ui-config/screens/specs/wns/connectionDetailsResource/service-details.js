import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { serviceConst } from "../../../../../ui-utils/commons";
import { getUserInfo, getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import { getPropertyDetails } from "../applyResource/property-locationDetails";
import { handleNA } from "../../utils";

const connectionType = getQueryArg(window.location.href, "connectionType")

const getRedirectionUrlToAddMeterReading = (state,dispatch) =>{  
  let connectionNumber = get(state.screenConfiguration.preparedFinalObject, `WaterConnection[0].connectionNo`, null);  
  let tenantId = get(state.screenConfiguration.preparedFinalObject, `WaterConnection[0].tenantId`, null); 
  let meterReadingUrl =  `meter-reading?connectionNos=${connectionNumber}&tenantId=${tenantId}`
  dispatch(setRoute(meterReadingUrl));
}
  

export const renderService1 = () => {
  
    if (connectionType === "Metered") {
      return getCommonContainer({
        serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { localePrefix: { moduleName: "WS", masterName: "APPLY" }, jsonPath: "WaterConnection[0].service" }),
        //connectionCategory: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].connectionCategory" }),
        oldConnectionNo : getLabelWithValue({ labelKey: "WS_SEARCH_CONNNECTION_OLD_CONSUMER_LABEL" }, { jsonPath: "WaterConnection[0].oldConnectionNo" }),

        connectionType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType" }),
        meterID: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_METER_ID" }, { jsonPath: "WaterConnection[0].meterId" }),
        pipeSize: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize" }),
        connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
       // rainwaterHarvestingFacility: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting" }),
        waterSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource" }),
        waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
        //sourceInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE_INFO" }, { jsonPath: "WaterConnection[0].sourceInfo" }),
        usageCategory :getLabelWithValue (
          {
            labelName: "Usage Type",
            labelKey: "WS_COMMON_USAGE_TYPE"
          },
          {
            localePrefix: {
              moduleName: "WS",
              masterName: "WSUSGTYPE"
            },
            jsonPath: "WaterConnection[0].usageCategory",
            callBack: handleNA
          },
        ),
        subUsageCategory: getLabelWithValue (
          {
            labelName: "Sub Usage Type",
            labelKey: "WS_SUB_USAGE_TYPE"
          },
          {
            localePrefix: {
              moduleName: "WS",
              masterName: "WSSUBUSGTYPE"
            },
            jsonPath: "WaterConnection[0].subUsageCategory",
            callBack: handleNA
          },
        ),

        //-commented for production release -PT
        // editSection: {
        //   componentPath: "Button",
        //   props: { color: "primary", style: { margin: "-16px" } },
        //   visible: true,
        //   gridDefination: { xs: 12, sm: 12, align: "left" },
        //   children: { buttonLabel: getLabel({ labelKey: "WS_CONNECTION_DETAILS_VIEW_CONSUMPTION_LABEL" }) },
        //   onClickDefination: {
        //     //action: "page_change",
        //     //path: `meter-reading?connectionNos=${connectionNumber}&tenantId=${tenantId}`
        //     action: "condition",
        //     callBack: (state, dispatch) => {
        //        getRedirectionUrlToAddMeterReading( state, dispatch);
        //     }

        //   }
        // },
      })
    } else {
      return getCommonContainer({
        serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
        oldConnectionNo : getLabelWithValue({ labelKey: "WS_SEARCH_CONNNECTION_OLD_CONSUMER_LABEL" }, { jsonPath: "WaterConnection[0].oldConnectionNo" }),

        //connectionCategory: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].connectionCategory" }),
        authorizedConnection: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_AUTHORIZED_CONN" }, { jsonPath: "WaterConnection[0].authorizedConnection" }),
        connectionType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType" }),
        connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
        pipeSize: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize" }),
        numberOfTaps: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_NO_OF_TAPS" }, { jsonPath: "WaterConnection[0].noOfTaps" }),
        motorInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_MOTOR_INFO" }, { jsonPath: "WaterConnection[0].motorInfo" }),
      //  rainwaterHarvestingFacility: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting" }),
        waterSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource" }),
        waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
        //sourceInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE_INFO" }, { jsonPath: "WaterConnection[0].sourceInfo" }),
        usageCategory :getLabelWithValue (
          {
            labelName: "Usage Type",
            labelKey: "WS_COMMON_USAGE_TYPE"
          },
          {
            localePrefix: {
              moduleName: "WS",
              masterName: "WSUSGTYPE"
            },
            jsonPath: "WaterConnection[0].usageCategory",
            callBack: handleNA
          },
        ),
        subUsageCategory: getLabelWithValue (
          {
            labelName: "Sub Usage Type",
            labelKey: "WS_SUB_USAGE_TYPE"
          },
          {
            localePrefix: {
              moduleName: "WS",
              masterName: "WSSUBUSGTYPE"
            },
            jsonPath: "WaterConnection[0].subUsageCategory",
            callBack: handleNA
          },
        ),
       
        
      })
    }
  
}

export const renderService2 = () => {
  return getCommonContainer({
    serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
    connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
    noOfWaterClosets: getLabelWithValue({ labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS" }, { jsonPath: "WaterConnection[0].noOfWaterClosets" }),
    numberOfToilets: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_NO_OF_TOILETS" }, { jsonPath: "WaterConnection[0].noOfToilets" }),
    drainageSize:getLabelWithValue({ labelKey: "WS_SERV_DETAIL_DRAINAGE_SIZE" }, { jsonPath: "WaterConnection[0].drainageSize" })
  })
  
}




export const getServiceDetails = () => {

  
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelKey: "WS_COMMON_SERV_DETAIL"
          })
        }
      }
    },
    viewOne: renderService1(),
    viewTwo: renderService2()
   });
};


