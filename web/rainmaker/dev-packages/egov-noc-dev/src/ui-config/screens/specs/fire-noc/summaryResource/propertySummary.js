import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";
import {
  getQueryArg,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";

const test = value => {
  value = value ? value.split(".")[0] : "";
  return value;
};

const tenantId = getQueryArg(window.location.href, "tenantId");

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-noc",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};

const propertyDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "noc-summary",
    scheama: getCommonGrayCard({
      propertyContainer: getCommonContainer({
        propertyType: getLabelWithValue(
          {
            labelName: "Property Type",
            labelKey: "NOC_PROPERTY_TYPE_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.noOfBuildings"
          }
        ),
        buildingName: getLabelWithValue(
          {
            labelName: "Name Of Building",
            labelKey: "NOC_NAME_OF_BUILDING_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].name"
          }
        ),
        buildingUsageType: getLabelWithValue(
          {
            labelName: "Building Usage Type",
            labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageType",
            callBack: test,
            localePrefix: {
              moduleName: "firenoc",
              masterName: "BuildingType"
            }
          }
        ),
        buildingUsageSubType: getLabelWithValue(
          {
            labelName: "Building Usage Subtype",
            labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageType",
            localePrefix: {
              moduleName: "firenoc",
              masterName: "BuildingType"
            }
          }
        ),
        buildingLandArea: getLabelWithValue(
          {
            labelName: "Land Area",
            // labelKey: "NOC_PROPERTY_DETAILS_LAND_AREA_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].landArea",
            // localePrefix: {
            //   moduleName: "firenoc",
            //   masterName: "BuildingLandArea"
            // },
          }
        ),
        buildingCoveredArea: getLabelWithValue(
          {
            labelName: "Total Covered Area",
            // labelKey: "NOC_PROPERTY_DETAILS_COVERED_AREA_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].totalCoveredArea",
            // localePrefix: {
            //   moduleName: "firenoc",
            //   masterName: "BuildingCoveredArea"
            // },
          }
        ),
        buildingParkingArea: getLabelWithValue(
          {
            labelName: "Parking Area",
            labelKey: "NOC_PROPERTY_DETAILS_PARKING_AREA_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].parkingArea",
            // localePrefix: {
            //   moduleName: "firenoc",
            //   masterName: "BuildingParkingArea"
            // },
          }
        ),
        buildingleftSurrounding: getLabelWithValue(
          {
            labelName: "Left surrounding",
            // labelKey: "NOC_PROPERTY_DETAILS_LEFT_SURROUNDING_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].leftSurrounding",
            // localePrefix: {
            //   moduleName: "firenoc",
            //   masterName: "BuildingParkingArea"
            // },
          }
        ),
        buildingrightSurrounding: getLabelWithValue(
          {
            labelName: "Right surrounding",
            // labelKey: "NOC_PROPERTY_DETAILS_RIGHT_SURROUNDING_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].rightSurrounding",
            // localePrefix: {
            //   moduleName: "firenoc",
            //   masterName: "BuildingParkingArea"
            // },
          }
        ),
        buildingfrontSurrounding: getLabelWithValue(
          {
            labelName: "Front surrounding",
            // labelKey: "NOC_PROPERTY_DETAILS_FRONT_SURROUNDING_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].frontSurrounding",
            // localePrefix: {
            //   moduleName: "firenoc",
            //   masterName: "BuildingParkingArea"
            // },
          }
        ),
        buildingbackSurrounding: getLabelWithValue(
          {
            labelName: "Back surrounding",
            // labelKey: "NOC_PROPERTY_DETAILS_BACK_SURROUNDING_LABEL"
          },
          {
            jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].backSurrounding",
            // localePrefix: {
            //   moduleName: "firenoc",
            //   masterName: "BuildingParkingArea"
            // },
          }
        ),
      })
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "FireNOCs[0].fireNOCDetails.buildings",
    prefixSourceJsonPath:
      "children.cardContent.children.propertyContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

const propertyLocationDetails = getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({

    areaType: getLabelWithValue(
      {
        labelName: "Area Type",
        // labelKey: "NOC_AREA_TYPE_LABEL"
      },
      { 
        
      jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.areaType" ,

    }),
    district: getLabelWithValue(
      {
        labelName: "District Name",
        // labelKey: "NOC_DISTRICT_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
       callBack: value => {
        return `TL_${value}`;
      }
     }
    ),
    subDistrict: getLabelWithValue(
      {
        labelName: "sub District Name",
        // labelKey: "NOC_SUB_DISTRICT_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict",
     
      callBack: value => {
        return `${value}`;
      }
          
     }
    ), 
    propertyId: getLabelWithValue(
      {
        labelName: "Property ID",
        labelKey: "NOC_PROPERTY_ID_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.propertyId" }
    ),
    city: getLabelWithValue(
      {
        labelName: "City",
        labelKey: "NOC_PROPERTY_CITY_LABEL"
      },
      {
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict",
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        }
      }
    ),
    doorHouseNo: getLabelWithValue(
      {
        labelName: "Door/House No.",
        labelKey: "NOC_SUMMARY_PROPERTY__LOCATION_DOOR_HOUSE_NO_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo" }
    ),
    buildingCompanyName: getLabelWithValue(
      {
        labelName: "Building/Company Name",
        labelKey: "NOC_PROPERTY_DETAILS_BLDG_NAME_LABEL"
      },
      {
        jsonPath:
          "FireNOCs[0].fireNOCDetails.propertyDetails.address.buildingName"
      }
    ),
    streetName: getLabelWithValue(
      {
        labelName: "Street Name",
        labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.addressLine2" }
    ),
    mohalla: getLabelWithValue(
      {
        labelName: "Mohalla",
        labelKey: "NOC_PROPERTY_DETAILS_MOHALLA_LABEL"
      },
      {
        jsonPath:
          "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code",
        callBack: value => {
          return `${getTransformedLocale(tenantId)}_REVENUE_${value}`;
        }
      }
    ),
    pincode: getLabelWithValue(
      {
        labelName: "Pincode",
        labelKey: "NOC_PROPERTY_DETAILS_PIN_LABEL"
      },
      { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.pincode" }  
    ),
    locationOnMap: getLabelWithValue(
      {
        labelName: "Location On Map",
        labelKey: "NOC_PROPERTY_DETAILS_GIS_CORD_LABEL"
      },
      {
        jsonPath:
          "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.latitude"
      }
    ),
    applicableFireStation: getLabelWithValue(
      {
        labelName: "Applicable Fire Station",
        labelKey: "NOC_PROPERTY_DETAILS_FIRESTATION_LABEL"
      },
      {
        jsonPath: "FireNOCs[0].fireNOCDetails.firestationId",
        localePrefix: {
          moduleName: "firenoc",
          masterName: "FireStations"
        }
      }
    )
  })
});

export const propertySummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Property Details",
          labelKey: "NOC_COMMON_PROPERTY_DETAILS"
        })
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: getLabel({
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            gotoApplyWithStep(state, dispatch, 1);
          }
        }
      }
    }
  },
  propertyDetailsHeader: getHeader("Property Details"),
  break: getBreak(),
  cardOne: propertyDetails,
  propertyLocationDetailsHeader: getHeader("Property Location Details"),
  cardTwo: propertyLocationDetails
});