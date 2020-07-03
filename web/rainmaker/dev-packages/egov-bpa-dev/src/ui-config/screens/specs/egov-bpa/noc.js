import {
    getBreak,
    getCommonCard,
    getCommonParagraph,
    getCommonGrayCard,
    getCommonContainer,
    getCommonTitle,
    getCommonSubHeader,    
    getLabelWithValue,
    getLabel    
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { checkValueForNA } from "../utils/index";

  const getHeader = label => {
    return {
      uiFramework: "custom-molecules-local",
      moduleName: "egov-bpa",
      componentPath: "DividerWithLabel",
      props: {
        className: "hr-generic-divider-label",
        labelProps: {},
        dividerProps: {},
        label
      },
      type: "array"
    };
  };

//   export const nocDetailsApply = getCommonContainer({
//   summaryContent: {
//     uiFramework: "custom-containers",
//     componentPath: "MultiItem",
//     props: {
//       className: "filed-inspection-summary",
//       scheama: nocSummaryContent(),
//       items: [],
//       hasAddItem: false,
//       isReviewPage: true,
//     //   prefixSourceJsonPath: "children.cardContent.children",
//       sourceJsonPath: "nocData",
//     //   headerJsonPath : "children.cardContent.children.header.children.header.children.key.props.label",
//       headerName : getLocaleLabels( "FI Report", "BPA_FI_REPORT")
//     },
//     type: "array"
//   }
// });
// const nocSummaryContent = () => {
    // return getCommonGrayCard({
  export const nocDetailsApply = getCommonGrayCard({
    header: getCommonTitle(
      {
        labelName: "NOC Details",
        // labelKey: "BPA_DOCUMENT_DETAILS_HEADER"
      },
      {
        style: {
        //   marginBottom: 18
        }
      }
    ),
    // nocTypeContainer: getCommonContainer({
    // }),    
    fireNocDetailsCard: getCommonCard({
        subHeader: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12
                    },
                    ...getCommonSubHeader({
                        labelName: "Fire NOC",
                        // labelKey: "BPA_SCRUNITY_SUMMARY"
                    })
                },
            }
        },
        fireNocDetailsContainer: getCommonContainer({
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
            submittedOn: getLabelWithValue(
                {
                    labelName: "Submitted On",
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
            approvedRejectOn: getLabelWithValue(
                {
                    labelName: "Approved/Rejected on",
                    // labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL"
                },
                {
                    jsonPath: "BPA.riskType",
                    callBack: checkValueForNA
                }
            ),
            documentsHeader: getHeader({
                labelName: "Documents",
                labelKey: "BPA_FIELD_INSPECTION_DOCUMENTS"
            }),
        }),
            documentDetailsCard: {
                uiFramework: "custom-molecules-local",
                moduleName: "egov-bpa",
                componentPath: "NocUploadCard",
                props: {
                  jsonPath: "finalCardsforPreview1",                  
                  sourceJsonPath: "documentDetailsPreview",
                  className: "noc-review-documents",
                  buttonLabel: {
                    labelName: "UPLOAD FILE",
                    labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
                  },
                  inputProps: {
                    accept: "image/*, .pdf, .png, .jpeg",
                    multiple: false
                  },
                  maxFileSize: 6000
                }
            }
    }),
    airNocDetailsCard: getCommonCard({
        subHeader: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12
                    },
                    ...getCommonSubHeader({
                        labelName: "Airport Authority of India",
                        // labelKey: "BPA_SCRUNITY_SUMMARY"
                    })
                },
            }
        },
        airNocDetailsContainer: getCommonContainer({
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
            submittedOn: getLabelWithValue(
                {
                    labelName: "Submitted On",
                    // labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
                },
                {
                    jsonPath: "BPA.applicationType",
                    callBack: checkValueForNA
                }
            ),
            approvedRejectOn: getLabelWithValue(
                {
                    labelName: "Approved/Rejected on",
                    // labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL"
                },
                {
                    jsonPath: "BPA.riskType",
                    callBack: checkValueForNA
                }
            ),
            documentsHeader: getHeader({
                labelName: "Documents",
                labelKey: "BPA_FIELD_INSPECTION_DOCUMENTS"
            }),
        }),
            documentDetailsCard: {
                uiFramework: "custom-molecules-local",
                moduleName: "egov-bpa",
                componentPath: "NocUploadCard",
                props: {
                  jsonPath: "finalCardsforPreview2",
                  sourceJsonPath: "documentDetailsPreview",
                  className: "noc-review-documents",
                  buttonLabel: {
                    labelName: "UPLOAD FILE",
                    labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
                  },
                  inputProps: {
                    accept: "image/*, .pdf, .png, .jpeg",
                    multiple: false
                  },
                  maxFileSize: 6000
                }
            }
    })
  });
// }