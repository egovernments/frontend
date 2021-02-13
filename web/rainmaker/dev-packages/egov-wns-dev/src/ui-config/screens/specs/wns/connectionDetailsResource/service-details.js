import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { serviceConst } from "../../../../../ui-utils/commons";
import { getUserInfo, getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import { getPropertyDetails } from "../applyResource/property-locationDetails";

const tenantId = getTenantIdCommon()
const connectionNumber = getQueryArg(window.location.href, "connectionNumber");
const service = getQueryArg(window.location.href, "service")
const connectionType = getQueryArg(window.location.href, "connectionType")

export const renderService1 = () => {
  
    if (connectionType === "Metered") {
      return getCommonContainer({
        serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
        connectionCategory: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].connectionCategory" }),
        connectionType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType" }),
        meterID: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_METER_ID" }, { jsonPath: "WaterConnection[0].meterId" }),
        pipeSize: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize" }),
        connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
       // rainwaterHarvestingFacility: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting" }),
        waterSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource" }),
        waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
        sourceInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE_INFO" }, { jsonPath: "WaterConnection[0].sourceInfo" }),
        editSection: {
          componentPath: "Button",
          props: { color: "primary", style: { margin: "-16px" } },
          visible: true,
          gridDefination: { xs: 12, sm: 12, align: "left" },
          //children: { buttonLabel: getLabel({ labelKey: "WS_CONNECTION_DETAILS_VIEW_CONSUMPTION_LABEL" }) },//need to uncomment later
          onClickDefination: {
            action: "page_change",
            path: `meter-reading?connectionNos=${connectionNumber}&tenantId=${tenantId}`
          }
        },
      })
    } else {
      return getCommonContainer({
        serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
        connectionCategory: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].connectionCategory" }),
        connectionType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType" }),
        pipeSize: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize" }),
        connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
      //  rainwaterHarvestingFacility: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting" }),
        waterSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource" }),
        waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
        authorizedConnection: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_AUTHORIZED_CONN" }, { jsonPath: "WaterConnection[0].authorizedConnection" }),
        motorInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_MOTOR_INFO" }, { jsonPath: "WaterConnection[0].motorInfo" }),
        numberOfTaps: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_NO_OF_TAPS" }, { jsonPath: "WaterConnection[0].noOfTaps" }),
        sourceInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE_INFO" }, { jsonPath: "WaterConnection[0].sourceInfo" })
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

//This is not used, splited to two function renderService1 and renderService2. This can be removed once module is stable.Keep it for reference-DC
export const renderService = () => {
  if (service === serviceConst.WATER) {

    if (connectionType === "Metered") {
      return getCommonContainer({
        serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
        connectionCategory: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].connectionCategory" }),
        connectionType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType" }),
        meterID: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_METER_ID" }, { jsonPath: "WaterConnection[0].meterId" }),
        pipeSize: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize" }),
        connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
       // rainwaterHarvestingFacility: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting" }),
        waterSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource" }),
        waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
        sourceInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE_INFO" }, { jsonPath: "WaterConnection[0].sourceInfo" }),
        editSection: {
          componentPath: "Button",
          props: { color: "primary", style: { margin: "-16px" } },
          visible: true,
          gridDefination: { xs: 12, sm: 12, align: "left" },
          //children: { buttonLabel: getLabel({ labelKey: "WS_CONNECTION_DETAILS_VIEW_CONSUMPTION_LABEL" }) },//need to uncomment later
          onClickDefination: {
            action: "page_change",
            path: `meter-reading?connectionNos=${connectionNumber}&tenantId=${tenantId}`
          }
        },
      })
    } else {
      return getCommonContainer({
        serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
        connectionCategory: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_CATEGORY" }, { jsonPath: "WaterConnection[0].connectionCategory" }),
        connectionType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_TYPE" }, { jsonPath: "WaterConnection[0].connectionType" }),
        pipeSize: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_PIPE_SIZE" }, { jsonPath: "WaterConnection[0].pipeSize" }),
        connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
      //  rainwaterHarvestingFacility: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC" }, { jsonPath: "WaterConnection[0].property.additionalDetails.isRainwaterHarvesting" }),
        waterSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE" }, { jsonPath: "WaterConnection[0].waterSource" }),
        waterSubSource: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE" }, { jsonPath: "WaterConnection[0].waterSubSource" }),
        authorizedConnection: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_AUTHORIZED_CONN" }, { jsonPath: "WaterConnection[0].authorizedConnection" }),
        motorInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_MOTOR_INFO" }, { jsonPath: "WaterConnection[0].motorInfo" }),
        numberOfTaps: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_NO_OF_TAPS" }, { jsonPath: "WaterConnection[0].noOfTaps" }),
        sourceInfo: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_WATER_SOURCE_INFO" }, { jsonPath: "WaterConnection[0].sourceInfo" })
      })
    }
  } else if (service === serviceConst.SEWERAGE) {
    
    return getCommonContainer({
      serviceType: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_SERV_LABEL" }, { jsonPath: "WaterConnection[0].service" }),
      connectionExecutionDate: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" }, { jsonPath: "WaterConnection[0].connectionExecutionDate" }),
      noOfWaterClosets: getLabelWithValue({ labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS" }, { jsonPath: "WaterConnection[0].noOfWaterClosets" }),
      numberOfToilets: getLabelWithValue({ labelKey: "WS_SERV_DETAIL_NO_OF_TOILETS" }, { jsonPath: "WaterConnection[0].noOfToilets" }),
      drainageSize:getLabelWithValue({ labelKey: "WS_SERV_DETAIL_DRAINAGE_SIZE" }, { jsonPath: "WaterConnection[0].drainageSize" })
    })
  }
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


