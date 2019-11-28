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
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.applicationType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.serviceType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.riskType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.applicationStatus",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.fromDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.toDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.bpaNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.ownerMobNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.BPAApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.tenantID",
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
    labelKey: "Provide at least one parameter to search for an application"
  }),
  appBPAHomeSearchResultsContainer: getCommonContainer({

    applicationType: getSelectField({
      label: {
        labelName: "Application Type",
        labelKey: "Application Type"
      },
      placeholder: {
        labelName: "Select Application Type",
        labelKey: "Select Application Type"
      },

      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
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

    serviceType: getSelectField({
      label: {
        labelName: "Service type",
        labelKey: "Service type"
      },
      placeholder: {
        labelName: "Select Service type",
        labelKey: "Select Service type"
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
        labelKey: "Select Risk Type"
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
    }),

    applicationStatus: getSelectField({
      label: {
        labelName: "Application status",
        labelKey: "Application status"
      },
      placeholder: {
        labelName: "Select Application Status",
        labelKey: "Select Application Status"
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

    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "From Date" },
      placeholder: {
        labelName: "From Date",
        labelKey: "BPA_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      // pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false
    }),

    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "To Date" },
      placeholder: {
        labelName: "To Date",
        labelKey: "BPA_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.toDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      // pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false
    }),

    bpaNo: getTextField({
      label: {
        labelName: "Application number",
        labelKey: "Application number"
      },
      placeholder: {
        labelName: "Enter Application number",
        labelKey: "Enter Application number"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.fireNOCNumber"
    }),
    
    ownerMobNo: getTextField({
      label: {
        labelName: "Mobile Number",
        labelKey: "Mobile Number"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "Enter your mobile No"
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
      // pattern: getPattern("MobileNo"),
      jsonPath: "searchScreen.mobileNumber",
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
    }),

    // tenantID: getTextField({
    //   label: {
    //     labelName: "Tenant ID",
    //     labelKey: "Tenant ID"
    //   },
    //   placeholder: {
    //     labelName: "Enter Tenant ID",
    //     labelKey: "Enter Tenant ID"
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 4
    //   },
    //   required: true,
    //   errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    //   jsonPath: "searchScreen.fireNOCNumber"
    // }),

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
