import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getTextField,
  getSelectField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { httpRequest } from "../../../../../ui-utils/api";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";


export const propertyLocationDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Mutation Details",
      labelKey: "PT_COMMON_PROPERTY_LOCATION_DETAILS"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  propertyLocationDetailsContainer: getCommonContainer({
    city: {
      ...getSelectField({
      label: {
        labelKey: "PT_COMMON_CITY"
      },
      placeholder: {
        labelKey: "PT_COMMON_CITY_PLACEHOLDER"
      },
      localePrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
      jsonPath: "Property.locationDetails.city",//db sake
      required: true,
      gridDefination: {
        xs: 12,
        sm: 6
      },
    }),
    beforeFieldChange: async (action, state, dispatch) => {
      //Below only runs for citizen - not required here in employee

      dispatch(
        prepareFinalObject(
          "Property.locationDetails.city",
          action.value
        )
      );
      try {
        let payload = await httpRequest(
          "post",
          "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
          "_search",
          [{ key: "tenantId", value: action.value }],
          {}
        );
        const mohallaData =
          payload &&
          payload.TenantBoundary[0] &&
          payload.TenantBoundary[0].boundary &&
          payload.TenantBoundary[0].boundary.reduce((result, item) => {
            result.push({
              ...item,
              name: `${action.value
                .toUpperCase()
                .replace(
                  /[.]/g,
                  "_"
                )}_REVENUE_${item.code
                .toUpperCase()
                .replace(/[._:-\s\/]/g, "_")}`
            });
            return result;
          }, []);
        dispatch(
          prepareFinalObject(
            "applyScreenMdmsData.tenant.localities",
            mohallaData
          )
        );
        dispatch(
          handleField(
            "register-property",
            "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.localityOrMohalla",
            "props.suggestions",
            mohallaData
          )
        );
        const mohallaLocalePrefix = {
          moduleName: action.value,
          masterName: "REVENUE"
        };
        dispatch(
          handleField(
            "register-property",
            "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children.localityOrMohalla",
            "props.localePrefix",
            mohallaLocalePrefix
          )
        );
      } catch (e) {
        console.log(e);
      }
    }

  },
    // localityOrMohalla: {
    //   uiFramework: "custom-containers-local",
    //   moduleName: "egov-tradelicence",
    //   componentPath: "AutosuggestContainer",
    //   jsonPath: "Property.locationDetails.locality.code",//db sake
    //   required: true,
    //   props: {
    //     style: {
    //       width: "100%",
    //       cursor: "pointer"
    //     },
    //     label: {
    //       labelName:"Locality/Mohalla",
    //           labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA"
    //         },
    //         placeholder: {
    //           labelName:"Enter Mohalla",
    //           labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA_PLACEHOLDER"
    //         },
    //         jsonPath: "Property.locationDetails.locality.code",//db sake
    //     sourceJsonPath: "applyScreenMdmsData.tenant.localities",
    //     labelsFromLocalisation: true,
    //     suggestions: [],
    //     fullwidth: true,
    //     inputLabelProps: {
    //       shrink: true
    //     },
    //     gridDefination: {
    //           xs: 12,
    //           sm: 6,
          
    //         },
    //   },
    // },
    localityOrMohalla:getSelectField({
      label: {
        labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA"
      },
      placeholder: {
        labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA_PLACEHOLDER"
      },
      sourceJsonPath: "applyScreenMdmsData.tenant.localities",
      jsonPath: "Property.locationDetails.locality.code",//db sake
      required: true,
      gridDefination: {
        xs: 12,
        sm: 6
      },
    }),

    
    doorNo: getTextField({
      label: {
        labelKey: "PT_COMMON_DOOR_NO_LABEL"
      },
      placeholder: {
        labelKey: "PT_COMMON_SEARCH_DOOR_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_DOOR_NO",
      jsonPath: "Property.locationDetails.doorNo"
    }),
    buildingOrColonyName: getTextField({
      label: {
        labelKey: "PT_COMMON_BUILDING_COLONY_LABEL"
      },
      placeholder: {
        labelKey: "PT_COMMON_SEARCH_BUILDING_COLONY_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_BUILDING_COLONY",
      jsonPath: "Property.locationDetails.buildingName"
    })
  })
});
