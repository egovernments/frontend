import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {handleNA } from '../../utils';

  export const existingConnectionDetails = getCommonContainer({
    noOfWaterConn: getLabelWithValue(
      {
        labelKey: "WS_NO_OF_WATER_CONNECTION",
        labelName:"No. of Water Connection"
      },
      {
        sourceJsonPath: "applyScreen.existingWaterConnCount",
        callBack: handleNA
      }
    ), 
    waterConnectionNo: getLabelWithValue(
      {
        labelKey: "WS_WATER_CONNECTION_NUMBER",
        labelName:"Water Connection No."
      },
      {
        sourceJsonPath: "applyScreen.existingWaterConn",
        callBack: handleNA
      }
    ),
    noOfSewerageConn: getLabelWithValue(
      {
        labelKey: "WS_NO_OF_SEWERAGE_CONNECTION",
        labelName:"No. of Sewerage Connection"
      },
      {
        sourceJsonPath: "applyScreen.existingSewerageConnCount",
        callBack: handleNA
      }
    ),   
    sewerageConnectionNo: getLabelWithValue(
      {
        labelKey: "WS_SEWERAGE_CONNECTION_NUMBER",
        labelName:"Sewerage Connection No."
      },
      {
        sourceJsonPath: "applyScreen.existingSewerageConn",
        callBack: handleNA
      }
    ),
    
   })
  
  export const getExistingConnectionDetails = (isEditable = true) => {
    return getCommonContainer({
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
              labelKey: "WS_COMMON_EXISTING_CONNECTION_HEADER",
              labelName:"Existing connection Details"
            })
          },
        }
      },
      viewFour: existingConnectionDetails
    });
  };
  
  
  