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
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { searchConnections, resetFields } from "./search-methods";
import { WithoutAuthSearchApiCall } from "../searchResource/functions"
import { getMohallaData } from "egov-ui-kit/utils/commons";
import { applyMohallaData } from "./publicSearchUtils";

export const searchApplications = {
	...getCommonCard({
		subHeader: getCommonTitle({
			labelName: "Search Property",
			labelKey: "SEARCH_PROPERTY"
		}),
		subParagraph: getCommonParagraph({
			labelName:
				"Provide at least one of the non-mandatory parameter to search for a property",
			labelKey: "PT_HOME_SEARCH_PROPERTY_SUB_HEADING"
		}),

		searchPropertyContainer: getCommonContainer({
			ulbCity: {
				uiFramework: "custom-containers-local",
				moduleName: "egov-pt",
				componentPath: "AutosuggestContainer",
				props: {
					label: {
						labelName: "ULB/City",
						labelKey: "PT_SEARCH_ULB_CITY"
					},
					placeholder: {
						labelName: "Select ULB/City",
						labelKey: "PT_SEARCH_ULB_CITY_PLACEHOLDER"
					},
					localePrefix: {
						moduleName: "TENANT",
						masterName: "TENANTS"
					},
					jsonPath: "searchScreen.tenantId",
					sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
					className: "autocomplete-dropdown",
					labelsFromLocalisation: true,
					required: true,
					disabled: false,
					isClearable: false
				},
				required: true,
				jsonPath: "searchScreen.tenantId",
				gridDefination: {
					xs: 12,
					sm: 4
				},
				beforeFieldChange: async (action, state, dispatch) => {
					if (action.value) {
						try {
							dispatch(fetchLocalizationLabel(getLocale(), action.value, action.value));
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
				}
			},
			locality: {
				uiFramework: "custom-containers-local",
				moduleName: "egov-pt",
				componentPath: "AutosuggestContainer",
				props: {
					label: {
						labelName: "Locality",
						labelKey: "PT_SEARCH_LOCALITY"
					},
					placeholder: {
						labelName: "Select Locality",
						labelKey: "PT_SEARCH_LOCALITY_PLACEHOLDER"
					},
					localePrefix: {
						moduleName: "TENANT",
						masterName: "TENANTS"
					},
					required: true,
					isClearable: true,
					labelsFromLocalisation: true,
					jsonPath: "searchScreen.locality.code",
					sourceJsonPath: "applyScreenMdmsData.tenant.localities",
					className: "locality-dropdown autocomplete-dropdown"
				},
				required: true,
				jsonPath: "searchScreen.locality.code",
				gridDefination: {
					xs: 12,
					sm: 3
				},
			},
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
					sm: 4
				},
				required: false,
				pattern: /^[a-zA-Z0-9-]*$/i,
				errorMessage: "ERR_INVALID_PROPERTY_ID",
				jsonPath: "searchScreen.ids"
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
					sm: 4
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
			consumerNo: getTextField({
				label: {
					labelKey: "WS_HOME_SEARCH_RESULTS_CONSUMER_NO_LABEL"
				},
				placeholder: {
					labelKey: "WS_HOME_SEARCH_RESULTS_CONSUMER_NO_PLACEHOLDER"
				},
				gridDefination: {
					xs: 12,
					sm: 4
				},
				required: false,
				pattern: getPattern("consumerNo"),
				errorMessage: "ERR_INVALID_CONSUMER_NO",
				jsonPath: "searchScreen.connectionNumber"
			}),
		}),
		button: getCommonContainer({
			buttonContainer: getCommonContainer({
				resetButton: {
					uiFramework: "custom-atoms-local",
					moduleName: "egov-pt",
					componentPath: "Button",
					gridDefination: {
						xs: 12,
						sm: 6
					},
					props: {
						className: "public-domain-search-buttons",
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
					uiFramework: "custom-atoms-local",
					moduleName: "egov-pt",
					componentPath: "Button",
					gridDefination: {
						xs: 12,
						sm: 6
					},
					props: {
						variant: "contained",
						className: "public-domain-search-buttons",
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
						callBack: searchConnections
					}
				}
			})
		}),
		props: {
			style: {
				position: "relative",
				top: "60px"
			}
		}
	},
		{
			style: {
				overflow: "visible"
			}
		}

	)
};