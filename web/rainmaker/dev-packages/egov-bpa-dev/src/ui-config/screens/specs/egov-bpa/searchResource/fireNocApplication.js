import {
  getCommonCard,
  getCommonContainer,
  getCommonParagraph,
  getCommonTitle,
  getDateField,
  getLabel,
  getPattern,
  getSelectField,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchApiCall } from "./functions";

const resetFields = (state, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAServiceSubServiceRiskContainer.children.serviceType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAServiceSubServiceRiskContainer.children.serviceSubType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAServiceSubServiceRiskContainer.children.riskType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appStatusToFromDateAndJurisdictionContainer.children.applicationStatus",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appStatusToFromDateAndJurisdictionContainer.children.fromDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appStatusToFromDateAndJurisdictionContainer.children.toDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appStatusToFromDateAndJurisdictionContainer.children.Jurisdiction",
      "props.value",
      ""
    )
  );
};

export const BPAApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search BPA Application",
    labelKey: "Search BPA Application"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "NOC_HOME_SEARCH_RESULTS_DESC"
  }),
  appBPAServiceSubServiceRiskContainer: getCommonContainer({

    serviceType: getSelectField({
      label: {
        labelName: "Service Type",
        labelKey: "Service Type"
      },
      placeholder: {
        labelName: "Select Service Type",
        labelKey: "Service Type"
      },

      localePrefix: {
        moduleName: "WF",
        masterName: "FIRENOC"
      },
      jsonPath: "searchScreen.serviceType",
      sourceJsonPath: "applyScreenMdmsData.searchScreen.serviceType",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [
        {
          code: "INITIATED"
        },
        {
          code: "APPLIED"
        },
        {
          code: "PAID"
        },
        {
          code: "APPROVED"
        },
        {
          code: "REJECTED"
        },
        {
          code: "CANCELLED"
        }
      ]
    }),

    serviceSubType: getSelectField({
      label: {
        labelName: "Service Sub type",
        labelKey: "Service Sub type"
      },
      placeholder: {
        labelName: "Select Service Sub type",
        labelKey: "Service Sub type"
      },

      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      jsonPath: "searchScreen.serviceSubType",
      sourceJsonPath: "applyScreenMdmsData.searchScreen.serviceSubType",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [
        {
          code: "INITIATED"
        },
        {
          code: "APPLIED"
        },
        {
          code: "PAID"
        },
        {
          code: "APPROVED"
        },
        {
          code: "REJECTED"
        },
        {
          code: "CANCELLED"
        }
      ]
    }),


    riskType: getSelectField({
      label: {
        labelName: "Risk Type",
        labelKey: "Risk Type"
      },
      placeholder: {
        labelName: "Select Risk Type",
        labelKey: "Risk Type"
      },

      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      jsonPath: "searchScreen.riskType",
      sourceJsonPath: "applyScreenMdmsData.searchScreen.riskType",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [
        {
          code: "INITIATED"
        },
        {
          code: "APPLIED"
        },
        {
          code: "PAID"
        },
        {
          code: "APPROVED"
        },
        {
          code: "REJECTED"
        },
        {
          code: "CANCELLED"
        }
      ]
    })

  }),
  appStatusToFromDateAndJurisdictionContainer: getCommonContainer({
    applicationStatus: getSelectField({
      label: {
        labelName: "Application status",
        labelKey: "NOC_APPLICATION_NOC_LABEL"
      },
      placeholder: {
        labelName: "Select Application Status",
        labelKey: "NOC_APPLICATION_PLACEHOLDER"
      },

      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      jsonPath: "searchScreen.status",
      sourceJsonPath: "applyScreenMdmsData.searchScreen.status",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),

    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "NOC_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "From Date",
        labelKey: "NOC_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false
    }),

    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "NOC_TO_DATE_LABEL" },
      placeholder: {
        labelName: "To Date",
        labelKey: "NOC_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.toDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false
    }),

    Jurisdiction: getSelectField({
      label: {
        labelName: "Jurisdiction",
        labelKey: "Jurisdiction"
      },
      placeholder: {
        labelName: "Select Jurisdiction",
        labelKey: "Jurisdiction"
      },

      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      jsonPath: "searchScreen.Jurisdiction",
      sourceJsonPath: "applyScreenMdmsData.searchScreen.Jurisdiction",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [
        {
          code: "INITIATED"
        },
        {
          code: "APPLIED"
        },
        {
          code: "PAID"
        },
        {
          code: "APPROVED"
        },
        {
          code: "REJECTED"
        },
        {
          code: "CANCELLED"
        }
      ]
    }),

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
            color: "#FE7A51",
            borderColor: "#FE7A51",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "NOC_HOME_SEARCH_RESET_BUTTON"
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
            labelKey: "NOC_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall
        }
      }
    })
  })
});
