import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonParagraph,
  getPattern,
  getDateField,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchApiCall, filestoreid } from "./functions";

export const Obps = getCommonCard(
  {
    subHeader: getCommonTitle({
      labelName: "Online Building Plan",
      labelKey: "Online Building Plan",
    }),
    // subParagraph: getCommonParagraph({
    //   labelName: "Provide at least File Store ID",
    //   labelKey: "Provide at least File Store ID",
    // }),
    // appTradeAndMobNumContainer: getCommonContainer({
    //   applicationNo: getTextField({
    //     label: {
    //       labelName: "Receipt No.",
    //       labelKey: "Receipt No",
    //     },
    //     placeholder: {
    //       labelName: "Enter Receipt No.",
    //       labelKey: "Enter Receipt No",
    //     },
    //     gridDefination: {
    //       xs: 12,
    //       sm: 4,
    //     },
    //     required: false,
    //     pattern: /^[a-zA-Z0-9-]*$/i,
    //     errorMessage: "ERR_INVALID_APPLICATION_NO",
    //     jsonPath: "searchScreen.applicationNumber",
    //   }),

    //   tradeLicenseNo: getTextField({
    //     label: {
    //       labelName: "Property ID",
    //       labelKey: "Property ID",
    //     },
    //     placeholder: {
    //       labelName: "Enter Property ID.",
    //       labelKey: "Enter Property ID.",
    //     },
    //     gridDefination: {
    //       xs: 12,
    //       sm: 4,
    //     },
    //     required: false,
    //     pattern: /^[a-zA-Z0-9-]*$/i,
    //     errorMessage: "ERR_INVALID_TRADE_LICENSE_NO",
    //     jsonPath: "searchScreen.licenseNumbers",
    //   }),
    //   // ownerMobNo: getTextField({
    //   //   label: {
    //   //     labelName: "Owner Mobile No.",
    //   //     labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_LABEL",
    //   //   },
    //   //   placeholder: {
    //   //     labelName: "Enter your mobile No.",
    //   //     labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER",
    //   //   },
    //   //   gridDefination: {
    //   //     xs: 12,
    //   //     sm: 4,
    //   //   },
    //   //   iconObj: {
    //   //     label: "+91 |",
    //   //     position: "start",
    //   //   },
    //   //   required: false,
    //   //   pattern: getPattern("MobileNo"),
    //   //   jsonPath: "searchScreen.mobileNumber",
    //   //   errorMessage: "ERR_INVALID_MOBILE_NUMBER",
    //   // }),
    // }),
    // applicationTypeAndToFromDateContainer: getCommonContainer({
    //   applicationType: {
    //     uiFramework: "custom-containers-local",
    //     moduleName: "egov-tradelicence",
    //     componentPath: "AutosuggestContainer",
    //     jsonPath: "searchScreen.applicationType",
    //     sourceJsonPath: "applyScreenMdmsData.searchScreen.applicationType",
    //     gridDefination: {
    //       xs: 12,
    //       sm: 4,
    //     },
    //     props: {
    //       className: "applicant-details-error autocomplete-dropdown",
    //       labelsFromLocalisation: true,
    //       suggestions: [],
    //       jsonPath: "searchScreen.applicationType",
    //       sourceJsonPath: "applyScreenMdmsData.searchScreen.applicationType",
    //       label: {
    //         labelName: "Application Type",
    //         labelKey: "TL_APPLICATION_TYPE_LABEL",
    //       },
    //       placeholder: {
    //         labelName: "Select Application Type",
    //         labelKey: "TL_APPLICATION_TYPE_PLACEHOLDER",
    //       },
    //       localePrefix: {
    //         moduleName: "TradeLicense",
    //         masterName: "ApplicationType",
    //       },
    //       fullwidth: true,
    //       required: false,
    //       isClearable: true,
    //       inputLabelProps: {
    //         shrink: true,
    //       },
    //     },
    //   },
    //   fromDate: getDateField({
    //     label: {
    //       labelName: "From Date",
    //       labelKey: "TL_COMMON_FROM_DATE_LABEL",
    //     },
    //     placeholder: {
    //       labelName: "Select From Date",
    //       labelKey: "TL_FROM_DATE_PLACEHOLDER",
    //     },
    //     jsonPath: "searchScreen.fromDate",
    //     gridDefination: {
    //       xs: 12,
    //       sm: 4,
    //     },
    //     pattern: getPattern("Date"),
    //     errorMessage: "ERR_INVALID_DATE",
    //     required: false,
    //   }),

    //   toDate: getDateField({
    //     label: { labelName: "To Date", labelKey: "TL_COMMON_TO_DATE_LABEL" },
    //     placeholder: {
    //       labelName: "Select to Date",
    //       labelKey: "TL_COMMON_TO_DATE_PLACEHOLDER",
    //     },
    //     jsonPath: "searchScreen.toDate",
    //     gridDefination: {
    //       xs: 12,
    //       sm: 4,
    //     },
    //     pattern: getPattern("Date"),
    //     errorMessage: "ERR_INVALID_DATE",
    //     required: false,
    //   }),
    // }),
    // appStatusContainer: getCommonContainer({
    //   applicationNo: {
    //     uiFramework: "custom-containers-local",
    //     moduleName: "egov-tradelicence",
    //     componentPath: "AutosuggestContainer",
    //     props: {
    //       label: {
    //         labelName: "Application status",
    //         labelKey: "TL_HOME_SEARCH_RESULTS_APP_STATUS_LABEL",
    //       },
    //       placeholder: {
    //         labelName: "Select Application Status",
    //         labelKey: "TL_HOME_SEARCH_RESULTS_APP_STATUS_PLACEHOLDER",
    //       },
    //       required: false,
    //       localePrefix: {
    //         moduleName: "WF",
    //         masterName: "NEWTL",
    //       },
    //       className: "autocomplete-dropdown",
    //       labelsFromLocalisation: true,
    //       isClearable: true,
    //       data: [
    //         {
    //           code: "INITIATED",
    //         },
    //         {
    //           code: "APPLIED",
    //         },
    //         {
    //           code: "FIELDINSPECTION",
    //         },
    //         {
    //           code: "PENDINGAPPROVAL",
    //         },
    //         {
    //           code: "PENDINGPAYMENT",
    //         },
    //         {
    //           code: "APPROVED",
    //         },
    //         {
    //           code: "CITIZENACTIONREQUIRED",
    //         },
    //         {
    //           code: "EXPIRED",
    //         },
    //         {
    //           code: "CANCELLED",
    //         },
    //         {
    //           code: "REJECTED",
    //         },
    //       ],
    //     },
    //     jsonPath: "searchScreen.status",
    //     gridDefination: {
    //       xs: 12,
    //       sm: 4,
    //     },
    //   },
    // }),

    button: getCommonContainer({
      // firstCont: {

      buttonContainer: getCommonContainer({
        firstCont: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 12,
            sm: 4,
          },
        },
        searchButton: {
          componentPath: "Button",
          gridDefination: {
            xs: 12,
            sm: 4,
          },
          props: {
            variant: "contained",
            style: {
              color: "white",

              backgroundColor: "#FE7A51",
              borderRadius: "2px",
              width: "80%",
              height: "48px",
            },
          },
          children: {
            buttonLabel: getLabel({
              labelName: "Click",
              labelKey: "Click",
            }),
          },
          onClickDefination: {
            action: "condition",
            callBack: filestoreid,
          },
        },
        lastCont: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 12,
            sm: 4,
          },
        },
      }),
    }),
  },
  {
    style: {
      overflow: "visible",
    },
  }
);
