import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getQueryArg
} from "egov-ui-framework/ui-utils/commons";
import { changeStep } from "../viewBillResource/footer";
import {
  getUserInfo
} from "egov-ui-kit/utils/localStorageUtils";

const gotoCreatePage = (state, dispatch) => {
  const createUrl = `/wns/meter-reading`

  dispatch(setRoute(createUrl));
};


export const getServiceDetails = () => {
  // const tenantId = JSON.parse(getUserInfo()).tenantId
  // const connectionNumber = getQueryArg(window.location.href, "connectionNumber");

  const tenantId = "pb"
  const connectionNumber = 'WS/107/2019-20/060020'


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
    viewOne: getCommonContainer({
      serviceType: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_SERV_LABEL"
        },
        {
          jsonPath: "WaterConnection[0].service"
        }
      ),
      connectionCategory: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_CONN_CATEGORY"
        },
        { jsonPath: "WaterConnection[0].connectionCategory" }
      ),
      connectionType: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_CONN_TYPE"
        },
        {
          jsonPath: "WaterConnection[0].connectionType",
        }
      ),
      meterID: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_METER_ID"
        },
        { jsonPath: "WaterConnection[0].meterId" }
      ),
      pipeSize: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
        },
        {
          jsonPath: "WaterConnection[0].pipeSize",
        }
      ),
      connectionExecutionDate: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
        },
        {
          jsonPath: "WaterConnection[0].connectionExecutionDate",
        }
      ),
      rainwaterHarvestingFacility: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC"
        },
        {
          jsonPath: "WaterConnection[0].rainWaterHarvesting"
        }
      ),
      waterSource: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_WATER_SOURCE"
        },
        { jsonPath: "WaterConnection[0].waterSource" }
      ),
      waterSubSource: getLabelWithValue(
        {
          labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
        },
        {
          jsonPath: "WaterConnection[0].waterSubSource"
        }
      ),
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            margin: "-16px"
          }
        },
        visible: true,
        gridDefination: {
          xs: 12,
          sm: 12,
          align: "left"
        },
        children: {
          buttonLabel: getLabel({
            labelKey: "WS_CONNECTION_DETAILS_VIEW_CONSUMPTION_LABEL"
          })
        },
        onClickDefination: {
          action: "page_change",
          // path: `/wns/meter-reading`
          path: `/wns/meter-reading?connectionNos=${connectionNumber}&tenantId=${tenantId}`
          // action: "condition",
          // callBack: ""
        }
      },
    })
  });
};


