import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonParagraph,
  getPattern,
  getDateField,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchApiCall } from "./functions";

export const tradeLicenseApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Water & Sewerage Connections",
    labelKey: "TL_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "TL_HOME_SEARCH_RESULTS_DESC"
  }),
  appTradeAndMobNumContainer: getCommonContainer({
    ulb: getSelectField({
      label: {
        labelName: "ULB",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Select ULB",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      errorMessage: "ERR_INVALID_ULB",
      jsonPath: "searchScreen.ulb"
    }),
    boundaryType: getSelectField({
      label: {
        labelName: "Boundary Type",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
      },
      placeholder: {
        labelName: "Select Boundary Type",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
      jsonPath: "searchScreen.boundaryType"
    }),
    boundaryValue: getSelectField({
      label: {
        labelName: "Boundary Value",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
      },
      placeholder: {
        labelName: "Select Boundary Value",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
      jsonPath: "searchScreen.boundaryValue"
    }),
    billingYear: getSelectField({
      label: {
        labelName: "Billing Year",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
      },
      placeholder: {
        labelName: "Select Billing Year",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
      jsonPath: "searchScreen.billingYear"
    }),
    billingPeriod: getSelectField({
      label: {
        labelName: "Billing Period",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
      },
      placeholder: {
        labelName: "Select Billing Period",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
      jsonPath: "searchScreen.billingPeriod"
    }),
    billingPeriodValue: getSelectField({
      label: {
        labelName: "Billing Period Value",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
      },
      placeholder: {
        labelName: "Select Billing Period Value",
        labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: true,
      errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
      jsonPath: "searchScreen.billingPeriodValue"
    }),
    counsumerNo: getTextField({
      label: {
        labelName: "Consumer No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      jsonPath: "searchScreen.consumerNo",
      errorMessage: "ERR_INVALID_MOBILE_NUMBER"
    })
  }),

  button: getCommonContainer({
    // firstCont: {

    buttonContainer: getCommonContainer({
      firstCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 2
        }
      },
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        props: {
          variant: "outlined",
          style: {
            color: "black",
            borderColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "95%",
            height: "48px",
            margin: "8px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "TL_HOME_SEARCH_RESULTS_BUTTON_RESET"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "95%",
            height: "48px",
            margin: "8px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "TL_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall
        }
      },
      lastCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 2
        }
      }
    })
  })
});
