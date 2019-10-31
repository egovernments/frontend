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
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.applicationNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.NOCNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.ownerMobNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.applicationNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.fromDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.toDate",
      "props.value",
      ""
    )
  );
};

export const NOCApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Water & Sewerage Connection",
    labelKey: "Search Water & Sewerage Connection"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "NOC_HOME_SEARCH_RESULTS_DESC"
  }),

  appNOCAndMobNumContainer: getCommonContainer({
    city: getSelectField({
      label: {
        labelName: "City",
        labelKey: "City"
      },
      placeholder: {
        labelName: "Select City",
        labelKey: "Select City"
      },
      localePrefix: {
        moduleName: "WF",
        masterName: "FIRENOC"
      },
      jsonPath: "searchScreen.status",
      sourceJsonPath: "applyScreenMdmsData.searchScreen.status",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      }
      // data: [
      //   {
      //     code: "INITIATED"
      //   },
      //   {
      //     code: "APPLIED"
      //   },
      //   {
      //     code: "PAID"
      //   },
      //   {
      //     code: "APPROVED"
      //   },
      //   {
      //     code: "REJECTED"
      //   },
      //   {
      //     code: "CANCELLED"
      //   }
      // ]
    }),

    propertyid: getTextField({
      label: {
        labelName: "Property ID",
        labelKey: "Property ID"
      },
      placeholder: {
        labelName: "Enter Property ID",
        labelKey: "Enter Property ID"
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
        labelName: "Owner Mobile No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
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
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
    }),
    cusomerid: getTextField({
      label: {
        labelName: "Consumer ID",
        labelKey: "Consumer ID"
      },
      placeholder: {
        labelName: "Enter Consumer ID",
        labelKey: "Enter Consumer ID"
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
    oldConsumerid: getTextField({
      label: {
        labelName: "Old Consumer ID",
        labelKey: "Old Consumer ID"
      },
      placeholder: {
        labelName: "Enter Old Consumer ID",
        labelKey: "Enter Old Consumer ID"
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
    applicationNo: getTextField({
      label: {
        labelName: "Application No.",
        labelKey: "Application No."
      },
      placeholder: {
        labelName: "Enter Application No.",
        labelKey: "Enter Application No."
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
