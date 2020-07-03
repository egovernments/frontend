import {
    getCommonCard,
    getCommonTitle,
    // getTextField,
    getCommonContainer,
    // getPattern,
    getLabelWithValue,
    // getBreak,
    // getSelectField,
    // getDateField,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
import { checkValueForNA } from "../../utils/index";

export const applicationOverview = getCommonContainer({
    header: getCommonTitle(
        {
          labelName: "Application Overview",
        //   labelKey: "BPA_ACTUAL_BUILDING_ABSTRACT_HEADER"
        },
        {
          style: {
            marginBottom: 18
          }
        }
    ),
    basicDetailsContainer: getCommonContainer({
        applicationNo: getLabelWithValue(
            {
                labelName: "Application No",
                // labelKey: "BPA_OC_SCRUTINY_NO_LABEL"
            },
            {
                jsonPath: "BPA.edcrNumber",
                callBack: checkValueForNA
            }
        ),
        module: getLabelWithValue(
            {
                labelName: "Module",
                // labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
            },
            {
                // localePrefix: {
                //     moduleName: "WF",
                //     masterName: "BPA"
                //   },
                jsonPath: "BPA.applicationType",
                callBack: checkValueForNA
            }
        ),
        locality: getLabelWithValue(
            {
                labelName: "Locality",
                // labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL"
            },
            {
                jsonPath: "BPA.riskType",
                callBack: checkValueForNA
            }
        ),
        status: getLabelWithValue(
            {
                labelName: "Status",
                // labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL"
            },
            {
                jsonPath: "BPA.serviceType",
                callBack: checkValueForNA
            }
        ),
        resetButton: {
            componentPath: "Button",
            gridDefination: {
              xs: 12,
              sm: 3
              // align: "center"
            },
            props: {
              variant: "outlined",
              style: {
                color: "#FE7A51",
                // backgroundColor: "#FE7A51",
                border: "#FE7A51 solid 1px",
                borderRadius: "2px",
                // width: window.innerWidth > 480 ? "80%" : "100%",
                // height: "48px"
              }
            },
            children: {
              buttonLabel: getLabel({
                labelName: "VIEW APPLICATION",
                // labelKey: "BPA_SCRUTINY_CLEARFORM_BUTTON"
              })
            },
            // onClickDefination: {
            //   action: "condition",
            //   callBack: resetFields
            // }
          },
        // applicationDate: getLabelWithValue(
        //     {
        //         labelName: "Application Date",
        //         labelKey: "BPA_BASIC_DETAILS_APP_DATE_LABEL"
        //     },
        //     {
        //         jsonPath: "BPA.auditDetails.createdTime",
        //         callBack: value => {
        //             return convertEpochToDate(value) || checkValueForNA;
        //         }
        //     }
        // ),
        // applicantName: getLabelWithValue(
        //     {
        //         labelName: "Applicant Name",
        //         labelKey: "EDCR_SCRUTINY_NAME_LABEL"
        //     },
        //     {
        //         jsonPath: "BPA.applicantName",
        //         callBack: checkValueForNA
        //     }
        // ),
        // stakeHolderName: getLabelWithValue(
        //     {
        //         labelName: "Stake Holder Name",
        //         labelKey: "EDCR_SH_NAME_LABEL"
        //     },
        //     {
        //         jsonPath: "BPA.appliedBy",
        //         callBack: checkValueForNA
        //     }
        // ),
        // remarks: getLabelWithValue(
        //     {
        //         labelName: "Remarks",
        //         labelKey: "BPA_BASIC_DETAILS_REMARKS_LABEL"
        //     },
        //     {
        //         jsonPath:
        //             "BPA.additionalDetails.remarks",
        //         callBack: checkValueForNA
        //     }
        // ),
        // buildingPermitNum: {
        //     uiFramework: "custom-atoms-local",
        //     moduleName: "egov-bpa",
        //     componentPath: "downloadFile",
        //     gridDefination: {
        //         xs: 3,
        //         sm: 3,
        //         md: 3
        //     },
        //     props: {
        //         label: {
        //             labelName: "Building Permit Number",
        //             labelKey: "EDCR_BUILDING_PERMIT_NUM_LABEL"
        //         },
        //         linkDetail: {
        //             labelName: "",
        //             labelKey: ""
        //         },
        //         jsonPath: "BPA.permitNumberLink",
        //     },
        //     type: "array"
        // }
    }),
})