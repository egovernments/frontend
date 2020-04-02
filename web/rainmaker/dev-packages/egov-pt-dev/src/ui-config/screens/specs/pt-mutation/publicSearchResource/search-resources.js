import {
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { httpRequest } from "../../../../../ui-utils";
import { propertySearch, resetFields } from "./search-methods";
import { getMohallaData } from "egov-ui-kit/utils/commons";
import { applyMohallaData } from "./publicSearchUtils";

export const searchPropertyDetails = {
  ...getCommonCard({
    subParagraph: getCommonParagraph({
      labelName:
        "Provide at least one non-mandatory parameter to search for an application",
      labelKey: "PT_HOME_SEARCH_RESULTS_DESC"
    }),

    searchPropertyContainer: getCommonContainer({
      ulbCity: {
        ...getSelectField({
          label: {
            labelName: "ULB",
            labelKey: "PT_ULB_CITY"
          },
          placeholder: {
            labelName: "Select ULB",
            labelKey: "PT_ULB_CITY_PLACEHOLDER"
          },

          localePrefix: {
            moduleName: "TENANT",
            masterName: "TENANTS"
          },
          jsonPath: "searchScreen.tenantId",
          sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
          required: true,
          props: {
            required: true,
            disabled: false
          },
          gridDefination: {
            xs: 12,
            sm: 3
          }
        }),
        beforeFieldChange: async (action, state, dispatch) => {
          //Below only runs for citizen - not required here in employee

          // dispatch(
          //   prepareFinalObject(
          // 	"Licenses[0].tradeLicenseDetail.address.city",
          // 	action.value
          //   )
          // );
          try {
            let payload = await httpRequest(
              "post",
              "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
              "_search",
              [{ key: "tenantId", value: action.value }],
              {}
            );
            const mohallaData = getMohallaData(payload, action.value);
            applyMohallaData(mohallaData, action.value, dispatch);
          } catch (e) {
            console.log(e);
          }
        }
      },
      locality: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pt",
        componentPath: "AutosuggestContainer",
        jsonPath: "searchScreen.locality.code",
        required: true,
        props: {
          style: {
            width: "100%",
            cursor: "pointer"
          },
          label: {
            labelName: "Locality",
            labelKey: "PT_SEARCH_LOCALITY"
          },
          placeholder: {
            labelName: "Select Locality",
            labelKey: "PT_SEARCH_LOCALITY_PLACEHOLDER"
          },
          jsonPath: "searchScreen.locality.code",
          sourceJsonPath: "applyScreenMdmsData.tenant.localities",
          labelsFromLocalisation: true,
          suggestions: [],
          fullwidth: true,
          required: true,
          inputLabelProps: {
            shrink: true
          }
          // className: "tradelicense-mohalla-apply"
        },
        beforeFieldChange: async (action, state, dispatch) => {
          // dispatch(
          //   prepareFinalObject(
          //     "Licenses[0].tradeLicenseDetail.address.locality.name",
          //     action.value && action.value.label
          //   )
          // );
        },
        gridDefination: {
          xs: 12,
          sm: 3
        }
      },
      ownerName: getTextField({
        label: {
          labelName: "Owner Name",
          labelKey: "PT_SEARCHPROPERTY_TABEL_OWNERNAME"
        },
        placeholder: {
          labelName: "Enter Property Owner Name",
          labelKey: "PT_SEARCH_OWNER_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name"),
        errorMessage: "Invalid Name",
        jsonPath: "searchScreen.ownerName",
        props: {
          className: "applicant-details-error"
        },
        gridDefination: {
          xs: 12,
          sm: 3
        }
      }),
      ownerMobNo: getTextField({
        label: {
          labelName: "Owner Mobile No.",
          labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
        },
        placeholder: {
          labelName: "Enter your mobile No.",
          labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 3
        },
        iconObj: {
          label: "+91 |",
          position: "start"
        },
        required: false,
        pattern: getPattern("MobileNo"),
        jsonPath: "searchScreen.mobileNumber",
        errorMessage: "ERR_INVALID_MOBILE_NUMBER"
      }),
      propertyID: getTextField({
        label: {
          labelName: "Property ID",
          labelKey: "PT_MUTATION_PID"
        },
        placeholder: {
          labelName: "Enter Property ID",
          labelKey: "PT_PROPERTY_ID_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 3
        },
        required: false,
        pattern: /^[a-zA-Z0-9-]*$/i,
        errorMessage: "ERR_INVALID_PROPERTY_ID",
        jsonPath: "searchScreen.ids"
      }),
      existingPropertyId: getTextField({
        label: {
          labelName: "Existing Property ID/Survey ID",
          labelKey: "PT_EXISTING_PROPERTY_SURVEY_ID"
        },
        placeholder: {
          labelName: "Enter Existing Property ID",
          labelKey: "PT_EXISTING_PROPERTY_ID_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 3
        },
        required: false,
        pattern: /^[a-zA-Z0-9-]*$/i,
        errorMessage: "ERR_INVALID_PROPERTY_ID",
        jsonPath: "searchScreen.oldpropertyids"
      })
    }),
    button: getCommonContainer({
      buttonContainer: getCommonContainer({
        resetButton: {
          componentPath: "Button",
          gridDefination: {
            xs: 12,
            sm: 6
            // align: "center"
          },
          props: {
            variant: "outlined",
            style: {
              color: "black",
              borderColor: "black",
              width: "220px",
              height: "48px",
              margin: "8px",
              float: "right"
            }
          },
          children: {
            buttonLabel: getLabel({
              labelName: "Reset",
              labelKey: "PT_HOME_RESET_BUTTON"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: resetFields
          }
        },
        searchButton: {
          componentPath: "Button",
          gridDefination: {
            xs: 12,
            sm: 6
            // align: "center"
          },
          props: {
            variant: "contained",
            style: {
              color: "white",
              margin: "8px",
              backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
              borderRadius: "2px",
              width: "220px",
              height: "48px"
            }
          },
          children: {
            buttonLabel: getLabel({
              labelName: "Search",
              labelKey: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: propertySearch
          }
        }
      })
	}),
	props:{
		style:{
			position: "relative",
			top: "60px",
		}
	}
  }),
  props:{
	style:{
		position: "relative",
      top: "60px",
	}
  }
};
