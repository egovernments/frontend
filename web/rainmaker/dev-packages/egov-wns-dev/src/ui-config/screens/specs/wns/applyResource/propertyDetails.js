import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getTextField,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { propertySearchApiCall } from './functions';
import { handlePropertySubUsageType, handleNA, resetFieldsForApplication } from '../../utils';
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import store from "ui-redux/store";
import get from "lodash/get";
let isMode = getQueryArg(window.location.href, "mode");
isMode = (isMode) ? isMode.toUpperCase() : "";
let applicationNumber = getQueryArg(window.location.href, "applicationNumber");
let connectionNumber = getQueryArg(window.location.href, "connectionNumber");
let tenantId = getQueryArg(window.location.href, "tenantId");
let action = getQueryArg(window.location.href, "action");
let modeaction = getQueryArg(window.location.href, "modeaction");

let mode = getQueryArg(window.location.href, "mode");

let modifyLink;
if(isMode==="MODIFY" || action ==="edit"){
  modifyLink=`/wns/apply?`;
  modifyLink = applicationNumber ? modifyLink + `applicationNumber=${applicationNumber}` : modifyLink;
  modifyLink = connectionNumber ? modifyLink + `&connectionNumber=${connectionNumber}` : modifyLink;
  modifyLink = action ? modifyLink + `&action=${action}` : modifyLink;
  modifyLink = modeaction ? modifyLink + `&modeaction=${modeaction}` : modifyLink;
  modifyLink = mode ? modifyLink + `&mode=${mode}` : modifyLink;

}else{
  modifyLink="/wns/apply"
}

const resetScreen =()=>{
   isMode = getQueryArg(window.location.href, "mode");
isMode = (isMode) ? isMode.toUpperCase() : "";
 applicationNumber = getQueryArg(window.location.href, "applicationNumber");
 connectionNumber = getQueryArg(window.location.href, "connectionNumber");
 tenantId = getQueryArg(window.location.href, "tenantId");
 action = getQueryArg(window.location.href, "action");
if(isMode==="MODIFY" || action ==="edit"){
  modifyLink=`/wns/apply?`;
  modifyLink = applicationNumber ? modifyLink + `applicationNumber=${applicationNumber}` : modifyLink;
  modifyLink = connectionNumber ? modifyLink + `&connectionNumber=${connectionNumber}` : modifyLink;
  modifyLink = action ? modifyLink + `&action=${action}` : modifyLink;
  modifyLink = modeaction ? modifyLink + `&modeaction=${modeaction}` : modifyLink;
  modifyLink = mode ? modifyLink + `&mode=${mode}` : modifyLink;
}else{
  modifyLink="/wns/apply"
}
}
export const propertyHeader = getCommonSubHeader({
  lKey:resetScreen(),
  labelKey: "WS_COMMON_PROP_DETAIL",
  labelName: "Property Details"
})

export const propertyID = getCommonContainer({
  propertyID: getTextField({
    label: { labelKey: "WS_PROPERTY_ID_LABEL" },
    placeholder: { labelKey: "WS_PROPERTY_ID_PLACEHOLDER" },
    gridDefination: { xs: 12, sm: 5, md: 5 },
    required: true,
    props: {
      style: {
        width: "100%"
      }
    },
    sourceJsonPath: "applyScreen.property.propertyId",
    title: {
      value: "Fill the form by searching your old approved trade license",
      // key: "TL_OLD_TL_NO"
    },
    pattern: /^[a-zA-Z0-9/-]*$/i,
    errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    jsonPath: "searchScreen.propertyIds",
  }),
  wnsPtySearchButton: {
    componentPath: "Button",
    gridDefination: { xs: 12, sm: 1, md: 1 },
    props: {
      variant: "contained",
      style: {
        color: "white",
        marginTop: "19px",
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
        borderRadius: "2px",
        width: "95%",
        height: "32px"
      }
    },
    children: {
      buttonLabel: getLabel({
        labelKey: "WS_SEARCH_CONNECTION_SEARCH_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: propertySearchApiCall
    },
  },
  clickHereLink: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-wns",
    componentPath: "AddLinkForProperty",
    props: { url: modifyLink, isMode },
    gridDefination: { xs: 12, sm: 4, md: 4 }
  }
})

const propertyDetails = getCommonContainer({
  propertyType: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_TYPE_LABEL"
    },
    {
      jsonPath:
        "applyScreen.property.propertyType",
      callBack: handleNA,
      localePrefix: {
        moduleName: "WS",
        masterName: "PROPTYPE"
      }

    }
  ),
  propertyUsageType: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_USAGE_TYPE_LABEL"
    },
    {
      jsonPath: "applyScreen.property.usageCategory",
      callBack: handleNA,
      localePrefix: {
        moduleName: "WS",
        masterName: "PROPUSGTYPE"
      }
    }
  ),
  propertySubUsageType: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_SUB_USAGE_TYPE_LABEL",
      labelName: "Property Sub Usage Type"
    },
    {
      jsonPath: "applyScreen.property.units[0].usageCategory",
      callBack: handlePropertySubUsageType,
      localePrefix: {
        moduleName: "WS",
        masterName: "PROPSUBUSGTYPE"
      }
    }
  ),
  plotSize: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_PLOT_SIZE_LABEL"
    },
    {
      jsonPath: "applyScreen.property.landArea",
      callBack: handleNA

    }
  ),
  constructionSize: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_CONSTRUCTION_SIZE_LABEL"
    },
    {
      jsonPath: "applyScreen.property.superBuiltUpArea",
      callBack: handleNA

    }
  ),
  numberOfFloors: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_NO_OF_FLOOR_LABEL",
      labelName: "Number Of Floors"
    },
    {
      jsonPath: "applyScreen.property.noOfFloors",
      //callBack: handleNA
      callBack: value => {
        let state = store.getState();
        let finalValue;
       // console.log("state---"+JSON.stringify(state.screenConfiguration.preparedFinalObject))
          let propertyType = get( state.screenConfiguration.preparedFinalObject.applyScreen, "property.propertyType" );
          
          if ( propertyType !== "VACANT") {
              finalValue = value;
          }
          else
              finalValue = "NA";
        return finalValue;
      }
    }
  ),
  numberOfFlats: getLabelWithValue(
    {
      labelKey: "WS_PROPERTY_NO_OF_FLATS_LABEL",
      labelName: "Number Of Flats"
    },
    {
      jsonPath: "applyScreen.property.noOfFlats",
      callBack: handleNA
    }
  ),
  arv: getLabelWithValue(
    {
      labelKey: "WS_PROP_DETAIL_ARV_LABEL"
    },
    {
      jsonPath: "applyScreen.property.units[0].arv",
      callBack: handleNA

    }
  ),
  // rainwaterHarvestingFacility: getLabelWithValue(
  //   {
  //     labelKey: "WS_SERV_DETAIL_CONN_RAIN_WATER_HARVESTING_FAC",
  //     labelName: "Rainwater Harvesting Facility"
  //   },
  //   {
  //     jsonPath: "applyScreen.property.additionalDetails.isRainwaterHarvesting",
  //     callBack: handleNA
  //   }
  // )
})



export const getPropertyIDDetails = (isEditable = true) => {
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
          }
        }
      }
    },
    viewTwo: propertyDetails
  });
};


