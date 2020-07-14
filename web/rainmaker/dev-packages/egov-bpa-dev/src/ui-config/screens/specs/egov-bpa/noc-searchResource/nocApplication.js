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
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchApiCall } from "./functions";

export const resetFields = (state, dispatch) => {
  dispatch(
    handleField(
      "noc-search",
      "components.div.children.nocApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.fromDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "noc-search",
      "components.div.children.nocApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.toDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "noc-search",
      "components.div.children.nocApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.nocNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "noc-search",
      "components.div.children.nocApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.applicationNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "noc-search",
      "components.div.children.nocApplication.children.cardContent.children.appBPAHomeSearchResultsContainer.children.nocType",
      "props.value",
      ""
    )
  );
};

export const nocApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Application for NOC",
    labelKey: "NOC_RESULTS_HEADER"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "BPA_HOME_SEARCH_RESULTS_DESC"
  }),
  appBPAHomeSearchResultsContainer: getCommonContainer({
    applicationNo: getTextField({
      label: {
        labelName: "Application number",
        labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Application number",
        labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.applicationNo"
    }),
    nocNo: getTextField({
      label: {
        labelName: "nocNo",
        labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter nocNo",
        labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.nocNo"
    })
  }),
  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
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
            labelKey: "BPA_HOME_SEARCH_RESET_BUTTON"
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
            labelKey: "BPA_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
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
