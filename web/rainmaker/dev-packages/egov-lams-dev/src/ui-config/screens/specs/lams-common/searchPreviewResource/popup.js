import {
    getCommonCardWithHeader,
    getLabel,
    getCommonCard,
    getTextField,
    getSelectField,
    getCommonContainer, getCommonGrayCard, getCommonHeader,
    getCommonSubHeader,
    getCommonTitle,
  } from "egov-ui-framework/ui-config/screens/specs/utils";

import {showHideAdhocPopup} from "../../utils";
  import get from "lodash/get";
  import { httpRequest } from "egov-ui-framework/ui-utils/api";
  import cloneDeep from "lodash/cloneDeep";
  import { createEstimateData } from "../../utils";
  import {
    prepareFinalObject,
    toggleSnackbar
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import set from "lodash/set";

  const updateAdhoc = (state, dispatch) => {
  };

export const popup = getCommonContainer({
    // header: getCommonHeader({
    //   labelName: "Add Adhoc Penalty/Rebate",
    //   labelKey: "TL_ADD_HOC_CHARGES_POPUP_HEAD"
    // }),
    header: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: {
          width: "100%",
          float: "right"
        }
      },
      children: {
        div1: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 10,
            sm: 10
          },
          props: {
            style: {
              width: "100%",
              float: "right"
            }
          },
          children: {
            div: getCommonHeader(
              {
                labelName: "Add Garbage Charges",
                labelKey: "TL_ADD_HOC_CHARGES_POPUP_HEAD"
              },
              {
                style: {
                  fontSize: "20px"
                }
              }
            )
          }
        },
        div2: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 2,
            sm: 2
          },
          props: {
            style: {
              width: "100%",
              float: "right",
              cursor: "pointer"
            }
          },
          children: {
            closeButton: {
              componentPath: "Button",
              props: {
                style: {
                  float: "right",
                  color: "rgba(0, 0, 0, 0.60)"
                }
              },
              children: {
                previousButtonIcon: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "close"
                  }
                }
              },
              onClickDefination: {
                action: "condition",
                callBack: showHideAdhocPopup
              }
            }
          }
        }
      }
    },
    adhocPenaltyCard: getCommonContainer(
      {
        // subheader: getCommonSubHeader(
        //   {
        //     labelName: "Adhoc Penalty",
        //     labelKey: "TL_ADD_HOC_CHARGES_POPUP_SUB_FIRST"
        //   },
        //   {
        //     style: {
        //       fontSize: "16px"
        //     }
        //   }
        // ),
        penaltyAmountAndReasonContainer: getCommonContainer({
          penaltyAmount: getTextField({
            label: {
              labelName: "Garbage Charges",
              labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_LABEL"
            },
            placeholder: {
              labelName: "Enter Garbage Charge Amount",
              labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_PLACEHOLDER"
            },
            props: {
              type:"number",
              style: {
                width: "90%"
              }
            },
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.garbageCharges"
          }),
          // penaltyReason: getSelectField({
          //   label: {
          //     labelName: "Reason for Adhoc Penalty",
          //     labelKey: "TL_PAYMENT_PENALTY_REASON"
          //   },
          //   placeholder: {
          //     labelName: "Select reason for Adhoc Penalty",
          //     labelKey: "TL_PAYMENT_PENALTY_REASON_SELECT"
          //   },
          //   props: {
          //     style: {
          //       width: "90%"
          //     }
          //   },
          //   data: [
          //     {
          //       code: "TL_ADHOC_PENDING_DUES"
          //     },
          //     {
          //       code: "TL_ADHOC_MISCALCULATION"
          //     },
          //     {
          //       code: "TL_ADHOC_ONE_TIME_PENALTY"
          //     },
          //     {
          //       code: "TL_ADHOC_OTHER"
          //     }
          //   ],
          //   jsonPath: "Licenses[0].tradeLicenseDetail.adhocPenaltyReason"
          // })
        }),
        commentsField: getTextField({
          label: {
            labelName: "Enter Comments",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
          },
          placeholder: {
            labelName: "Enter Comments",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            style: {
              width: "90%"
            }
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.garbageComments"
        })
      },
      {
        style: {
          marginTop: "12px"
        }
      }
    ),
    // adhocRebateCard: getCommonContainer(
    //   {
    //     subHeader: getCommonSubHeader(
    //       {
    //         labelName: "Adhoc Rebate",
    //         labelKey: "TL_ADD_HOC_CHARGES_POPUP_SUB_SEC"
    //       },
    //       {
    //         style: {
    //           fontSize: "16px"
    //         }
    //       }
    //     ),
    //     rebateAmountAndReasonContainer: getCommonContainer({
    //       rebateAmount: getTextField({
    //         label: {
    //           labelName: "Adhoc Rebate Amount",
    //           labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_LABEL"
    //         },
    //         placeholder: {
    //           labelName: "Enter Adhoc Rebate Amount",
    //           labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_PLACEHOLDER"
    //         },
    //         props: {
    //           style: {
    //             width: "90%"
    //           }
    //         },
    //         jsonPath: "Licenses[0].tradeLicenseDetail.adhocExemption"
    //       }),
    //       rebateReason: getSelectField({
    //         label: {
    //           labelName: "Reason for Adhoc Rebate",
    //           labelKey: "TL_PAYMENT_REBATE_REASON"
    //         },
    //         placeholder: {
    //           labelName: "Select Reason for Adhoc Rebate",
    //           labelKey: "TL_PAYMENT_REBATE_REASON_SELECT"
    //         },
    //         props: {
    //           style: {
    //             width: "90%"
    //           }
    //         },
    //         data: [
    //           {
    //             code: "TL_REBATE_ADVANCED_PAID"
    //           },
    //           {
    //             code: "TL_REBATE_BY_COMMISSIONER"
    //           },
    //           {
    //             code: "TL_REBATE_ADDITIONAL_AMOUNT_CAHNGED"
    //           },
    //           {
    //             code: "TL_ADHOC_OTHER"
    //           }
    //         ],
    //         jsonPath: "Licenses[0].tradeLicenseDetail.adhocExemptionReason"
    //       }),
    //       rebateCommentsField: getTextField({
    //         label: {
    //           labelName: "Enter Comments",
    //           labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    //         },
    //         placeholder: {
    //           labelName: "Enter Comments",
    //           labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    //         },
    //         gridDefination: {
    //           xs: 12,
    //           sm: 12
    //         },
    //         props: {
    //           style: {
    //             width: "90%"
    //           }
    //         },
    //         jsonPath: "Licenses[0].tradeLicenseDetail.rebateComments"
    //       })
    //     })
    //   },
    //   {
    //     style: {
    //       marginTop: "24px"
    //     }
    //   }
    // ),
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          width: "100%",
          textAlign: "right"
        }
      },
      children: {
        cancelButton: {
          componentPath: "Button",
          props: {
            variant: "outlined",
            color: "primary",
            style: {
              width: "140px",
              height: "48px",
              marginRight: "16px"
            }
          },
          children: {
            previousButtonLabel: getLabel({
              labelName: "CANCEL",
              labelKey: "TL_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: showHideAdhocPopup
          }
        },
        addButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              width: "140px",
              height: "48px"
            }
          },
          children: {
            previousButtonLabel: getLabel({
              labelName: "ADD",
              labelKey: "TL_ADD_HOC_CHARGES_POPUP_BUTTON_ADD"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: updateAdhoc
          }
        }
      }
    }
  });