import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  export const existingConnectionDetails = getCommonContainer({
    count: getLabelWithValue(
      {
        labelKey: "WS_NO_OF_CONNECTION",
        labelName:"No of connection"
      },
      {
        jsonPath: "applyScreen.property.address.city",
      }
    ),    
    connectionNo: getLabelWithValue(
      {
        labelKey: "WS_CONNECTION_NUMBER",
        labelName:"Connection No."
      },
      {
        jsonPath: "applyScreen.property.address.doorNo",
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
  
  
  